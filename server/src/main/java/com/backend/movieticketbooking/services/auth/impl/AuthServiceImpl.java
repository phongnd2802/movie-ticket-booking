package com.backend.movieticketbooking.services.auth.impl;

import com.backend.movieticketbooking.common.ErrorCode;
import com.backend.movieticketbooking.dtos.auth.UserDTO;
import com.backend.movieticketbooking.dtos.auth.request.LoginRequest;
import com.backend.movieticketbooking.dtos.auth.request.RegisterRequest;
import com.backend.movieticketbooking.dtos.auth.request.ResendOTPRequest;
import com.backend.movieticketbooking.dtos.auth.request.VerifyOTPRequest;
import com.backend.movieticketbooking.dtos.auth.response.LoginResponse;
import com.backend.movieticketbooking.dtos.auth.response.RefreshTokenResponse;
import com.backend.movieticketbooking.dtos.auth.response.RegisterResponse;
import com.backend.movieticketbooking.entities.auth.SessionEntity;
import com.backend.movieticketbooking.exceptions.InternalServerException;
import com.backend.movieticketbooking.repositories.SessionRepository;
import com.backend.movieticketbooking.security.jwt.JwtProvider;
import com.backend.movieticketbooking.security.userprinciple.UserDetailService;
import com.backend.movieticketbooking.services.cache.local.LocalCacheService;
import com.backend.movieticketbooking.services.kafka.message.OtpMessage;
import com.backend.movieticketbooking.entities.auth.ProfileEntity;
import com.backend.movieticketbooking.entities.auth.UserEntity;
import com.backend.movieticketbooking.enums.RoleEnum;
import com.backend.movieticketbooking.exceptions.BadRequestException;
import com.backend.movieticketbooking.mapper.ProfileMapper;
import com.backend.movieticketbooking.mapper.UserMapper;
import com.backend.movieticketbooking.repositories.ProfileRepository;
import com.backend.movieticketbooking.repositories.UserRepository;
import com.backend.movieticketbooking.services.auth.AuthService;
import com.backend.movieticketbooking.services.cache.distributed.DistributedCacheService;
import com.backend.movieticketbooking.services.kafka.KafkaProducer;
import com.backend.movieticketbooking.utils.CryptoUtil;
import com.backend.movieticketbooking.utils.SnowflakeGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.TimeUnit;


@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthServiceImpl implements AuthService {

    DistributedCacheService redisDistributedService;

    JwtProvider jwtService;

    UserRepository userRepository;

    ProfileRepository profileRepository;

    PasswordEncoder passwordEncoder;

    UserMapper userMapper;

    ProfileMapper profileMapper;

    KafkaProducer kafkaProducer;

    UserDetailService userDetailService;

    SessionRepository sessionRepository;

    @PersistenceContext
    EntityManager entityManager;

    LocalCacheService<String, UserDetails> userLocalCacheService;

    ObjectMapper objectMapper;

    SnowflakeGenerator snowflakeGenerator;

    private static final Long OTP_EXPIRED_TIME = 60L;

    @Override
    @Transactional
    public LoginResponse login(LoginRequest request) {
        Optional<UserEntity> userEntity = userRepository.findByUserEmail(request.getEmail());
        if (userEntity.isEmpty()) {
            throw new BadRequestException(ErrorCode.AUTHENTICATION_FAILED);
        }
        UserDetails userDetails = userDetailService.fromUserEntity(userEntity.get());
        if (userDetails == null) {
            throw new BadRequestException(ErrorCode.AUTHENTICATION_FAILED);
        }

        if (!passwordEncoder.matches(request.getPassword(), userDetails.getPassword())) {
            throw new BadRequestException(ErrorCode.AUTHENTICATION_FAILED);
        }

        if (!userEntity.get().isUserVerified()) {
            throw new BadRequestException(ErrorCode.EMAIL_NOT_VERIFIED);
        }

        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        long subjectId = snowflakeGenerator.nextId();
        String accessToken = jwtService.createAccessToken(authentication, String.valueOf(subjectId));
        String refreshToken = jwtService.createRefreshToken(authentication, String.valueOf(subjectId));

        ProfileEntity profileEntity = profileRepository.findByUser(userEntity.get());
        if (profileEntity == null) {
            throw new BadRequestException(ErrorCode.AUTHENTICATION_FAILED);
        }

        SessionEntity sessionEntity = SessionEntity.builder()
                .sessionId(String.valueOf(subjectId))
                .refreshToken(refreshToken)
                .refreshTokenUsed(null)
                .userAgent(request.getUserAgent())
                .userLoginIp(request.getLoginIp())
                .userLoginTime(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusDays(7))
                .user(userEntity.get())
                .build();
        entityManager.persist(sessionEntity);

        redisDistributedService.setObjectTTL(getUserKeyDetails(userDetails.getUsername()), userDetails, 3600L, TimeUnit.SECONDS);
        userLocalCacheService.put(userDetails.getUsername(), userDetails);

        return LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .profile(UserDTO.builder()
                        .userEmail(profileEntity.getUserEmail())
                        .userName(profileEntity.getUserName())
                        .userGender(profileEntity.isUserGender())
                        .userBirthday(profileEntity.getUserBirthday())
                        .userMobile(profileEntity.getUserMobile())
                        .build())
                .build();
    }

    @Override
    @Transactional
    public RegisterResponse register(RegisterRequest request) throws BadRequestException {
        // 1. Hash Email
        log.info("Email address: {}", request.getUserEmail());
        String hashedEmail = CryptoUtil.sha256Hash(request.getUserEmail());
        log.info("Hashed email address: {}", hashedEmail);

        // 2. Check if email already exists
        Optional<UserEntity> userFound = userRepository.findByUserEmail(request.getUserEmail());
        if (userFound.isPresent()) {
            // Check if the user is currently in the authentication session
            boolean exists = redisDistributedService.exists(getUserKeySession(hashedEmail));
            if (!exists) {
                throw new BadRequestException(ErrorCode.EMAIL_ALREADY_EXISTS);
            }
            return RegisterResponse.builder()
                    .email(userFound.get().getUserEmail())
                    .token(CryptoUtil.encodeBase64(hashedEmail))
                    .build();
        }

        // 3. Hash Password
        String hashedPassword = passwordEncoder.encode(request.getUserPassword());
        log.info("Hashed password: {}", hashedPassword);

        // Generate OTP for user verification
        String newOtp = generateOtp();
        log.info("New otp: {}", newOtp);


        // 4. Save user data to the User table
        UserEntity userEntity = userMapper.toUserEntity(request);

        Set<RoleEnum> userRoles = new HashSet<>();
        userRoles.add(RoleEnum.CUSTOMER); // Add the 'CUSTOMER' role
        userEntity.setRoles(userRoles);
        userEntity.setUserPassword(hashedPassword);
        userEntity.setUserOtp(newOtp);
        userEntity.setUserVerified(false);
        userEntity.setUserDeleted(false);

        userRepository.save(userEntity);

        // 5. Save user profile data to the Profile table
        ProfileEntity profileEntity = profileMapper.toProfileEntity(request);
        profileEntity.setUser(userEntity);
        profileRepository.save(profileEntity);

        // 6. Store OTP in Redis for session and verification purposes
        redisDistributedService.setStringTTL(getUserKeyOtp(hashedEmail), newOtp, OTP_EXPIRED_TIME, TimeUnit.SECONDS);
        redisDistributedService.setStringTTL(getUserKeySession(hashedEmail), "1", OTP_EXPIRED_TIME, TimeUnit.SECONDS);

        // 7. Send OTP message to Kafka for further processing
//        try {
//            OtpMessage message = new OtpMessage(userEntity.getUserEmail(), newOtp);
//            String messageJson = objectMapper.writeValueAsString(message);
//            kafkaProducer.sendSync("otp-auth-topic", messageJson);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//            throw new RuntimeException(e);
//        }

        // 8. Return the registration response with the encoded hashed email
        return RegisterResponse.builder()
                .email(userEntity.getUserEmail())
                .token(CryptoUtil.encodeBase64(hashedEmail))
                .build();
    }

    @Override
    public Boolean verifyOTP(VerifyOTPRequest request) throws BadRequestException {
        try {
            String token = CryptoUtil.decodeBase64(request.getToken());
            Long ttl = redisDistributedService.getTTL(getUserKeySession(token));
            if (ttl == null || ttl <= 0) {
                throw new BadRequestException(ErrorCode.OTP_SESSION_EXPIRED);
            }

            String otpRedis = redisDistributedService.getString(getUserKeyOtp(token));
            if (!request.getOtp().equals(otpRedis)) {
                throw new BadRequestException(ErrorCode.OTP_DOES_NOT_MATCH);
            }

            Optional<UserEntity> userEntity = userRepository.findByUserEmail(request.getEmail());
            if (userEntity.isEmpty()) {
                throw new BadRequestException(ErrorCode.EMAIL_NOT_FOUND);
            }

            userEntity.get().setUserVerified(true);
            userRepository.save(userEntity.get());

            redisDistributedService.deleteKey(getUserKeyOtp(token));
            redisDistributedService.deleteKey(getUserKeySession(token));
            return true;
        } catch (IllegalArgumentException e) {
            throw new BadRequestException(ErrorCode.OTP_SESSION_EXPIRED);
        }
    }

    @Override
    public void logout(String token) {
        Claims claims = jwtService.getTokenClaims(token);
        if (claims == null) {
            throw new InternalServerException(ErrorCode.INTERNAL_SERVER_ERROR);
        }

        sessionRepository.deleteById(claims.getSubject());

        Long remainingTime = jwtService.getTokenExpiration(claims) / 1000;
        redisDistributedService.setStringTTL(getUserKeyBlackList(claims.getSubject()), "1", remainingTime, TimeUnit.SECONDS);
    }

    @Override
    @Transactional
    public RefreshTokenResponse refreshToken(String refreshToken) {
        Claims claims = jwtService.getTokenClaims(refreshToken);
        if (claims == null) {
            throw new InternalServerException(ErrorCode.INTERNAL_SERVER_ERROR);
        }

        Optional<SessionEntity> foundRefreshTokenUsed = sessionRepository.findByRefreshTokenUsed(refreshToken);
        if (foundRefreshTokenUsed.isPresent()) {
            if (foundRefreshTokenUsed.get().getRefreshTokenUsed().equals(refreshToken)) {
                throw new BadRequestException(ErrorCode.REFRESH_TOKEN_USED);
            }
        }

        Optional<SessionEntity> foundSession = sessionRepository.findById(claims.getSubject());
        if (foundSession.isEmpty()) {
            throw new BadRequestException(ErrorCode.SESSION_NOT_FOUND);
        }

        SessionEntity session = foundSession.get();

        if (!session.getRefreshToken().equals(refreshToken)) {
            throw new BadRequestException(ErrorCode.REFRESH_TOKEN_DOES_NOT_MATCH);
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String newAccessToken = jwtService.createAccessToken(authentication, session.getSessionId());
        String newRefreshToken = jwtService.createRefreshToken(authentication, session.getSessionId());

        session.setRefreshTokenUsed(refreshToken);
        session.setRefreshToken(newRefreshToken);
        session.setExpiresAt(LocalDateTime.now().plusDays(7));
        entityManager.merge(session);

        return RefreshTokenResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .build();
    }

    @Override
    public Long getTimeToLiveOTP(String token) {
        try {
            Long ttl = redisDistributedService.getTTL(getUserKeyOtp(CryptoUtil.decodeBase64(token)));
            if (ttl == null || ttl <= 0) {
                throw new BadRequestException(ErrorCode.OTP_SESSION_EXPIRED);
            }
            return ttl;
        } catch (IllegalArgumentException e) {
            throw new BadRequestException(ErrorCode.OTP_SESSION_EXPIRED);
        }
    }

    @Override
    public void resendOTP(ResendOTPRequest request) {
        try {
            String token = CryptoUtil.decodeBase64(request.getToken());
            boolean exist = redisDistributedService.exists(getUserKeySession(token));
            if (exist) {
                throw new BadRequestException(ErrorCode.OTP_IS_EXISTING);
            }

            String newOtp = generateOtp();
            log.info("New otp: {}", newOtp);

            redisDistributedService.setStringTTL(getUserKeyOtp(token), newOtp, OTP_EXPIRED_TIME, TimeUnit.SECONDS);
            redisDistributedService.setStringTTL(getUserKeySession(token), "1", OTP_EXPIRED_TIME, TimeUnit.SECONDS);

            // Send OTP message to Kafka for further processing
            OtpMessage message = new OtpMessage(request.getEmail(), newOtp);
            String messageJson = objectMapper.writeValueAsString(message);
            kafkaProducer.sendSync("otp-auth-topic", messageJson);

        } catch (IllegalArgumentException e) {
            throw new BadRequestException(ErrorCode.OTP_SESSION_EXPIRED);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    private String getUserKeyDetails(String email) {
        return "usr:" + email;
    }

    private String getUserKeySession(String hashedEmail) {
        return "usr:" + hashedEmail + ":" + "session";
    }

    private String getUserKeyOtp(String hashedEmail) {
        return "usr:" + hashedEmail + ":" + "otp";
    }

    private String getUserKeyBlackList(String subjectUUID) {
        return "usr:" + subjectUUID + ":" + "blacklist";
    }

    private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }
}

package com.backend.movieticketbooking.security.userprinciple;

import com.backend.movieticketbooking.entities.auth.ProfileEntity;
import com.backend.movieticketbooking.entities.auth.UserEntity;
import com.backend.movieticketbooking.repositories.UserRepository;
import com.backend.movieticketbooking.services.cache.distributed.DistributedCacheService;
import com.backend.movieticketbooking.services.cache.local.LocalCacheService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.TimeUnit;


@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserDetailService implements UserDetailsService {

    UserRepository userRepository;

    LocalCacheService<String, UserDetails> userLocalCacheService;

    DistributedCacheService distributedCacheService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserDetails cachedUser = userLocalCacheService.get(email);
        if (cachedUser != null) {
            log.info("UserDetail from local cache: {}", email);
            return cachedUser;
        }

        cachedUser = distributedCacheService.getObject(getUserKeyDetails(email), UserPrinciple.class);
        if (cachedUser != null) {
            log.info("UserDetail from distributed: {}", email);
            userLocalCacheService.put(email, cachedUser);
            return cachedUser;
        }

        log.info("UserDetail from database: {}", email);
        Optional<UserEntity> user = userRepository.findByUserEmail(email);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException(email);
        }

        UserDetails userDetails = UserPrinciple.build(user.get());

        userLocalCacheService.put(email, userDetails);
        distributedCacheService.setObjectTTL(getUserKeyDetails(userDetails.getUsername()), userDetails, 3600L, TimeUnit.SECONDS);
        return userDetails;
    }

    public UserDetails fromUserEntity(UserEntity userEntity) {
        return UserPrinciple.build(userEntity);
    }



    private String getUserKeyDetails(String email) {
        return "usr:" + email;
    }
}

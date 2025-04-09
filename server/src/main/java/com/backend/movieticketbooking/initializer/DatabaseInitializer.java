package com.backend.movieticketbooking.initializer;


import com.backend.movieticketbooking.dtos.cinema.CinemaDTO;
import com.backend.movieticketbooking.dtos.cinema.request.CreateCinemaHallRequest;
import com.backend.movieticketbooking.entities.auth.ProfileEntity;
import com.backend.movieticketbooking.entities.auth.UserEntity;
import com.backend.movieticketbooking.entities.movies.MovieEntity;
import com.backend.movieticketbooking.enums.RoleEnum;
import com.backend.movieticketbooking.enums.SeatTypeEnum;
import com.backend.movieticketbooking.repositories.MovieRepository;
import com.backend.movieticketbooking.repositories.ProfileRepository;
import com.backend.movieticketbooking.repositories.UserRepository;
import com.backend.movieticketbooking.services.cinema.CinemaService;
import jakarta.annotation.PostConstruct;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.*;

@Component
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DatabaseInitializer {

    UserRepository userRepository;

    ProfileRepository profileRepository;

    PasswordEncoder passwordEncoder;

    JdbcTemplate jdbcTemplate;


    CinemaService cinemaService;

    MovieRepository movieRepository;

    //@PostConstruct
    @Transactional
    public void createAdminAccount() {
        log.info("Creating admin account");

        UserEntity user = UserEntity.builder()
                .userEmail("admin@backend.com")
                .userPassword(passwordEncoder.encode("admin123"))
                .userOtp("123456")
                .userDeleted(false)
                .userVerified(true)
                .roles(Set.of(RoleEnum.ADMIN, RoleEnum.CUSTOMER))
                .build();
        userRepository.save(user);

        ProfileEntity profile = ProfileEntity.builder()
                .userMobile("0001112223")
                .userEmail("admin@backend.com")
                .userBirthday(LocalDate.now())
                .userGender(true)
                .user(user)
                .build();


        profileRepository.save(profile);
    }

    static final int BATCH_SIZE = 1000;
    //@PostConstruct
    @Transactional
    public void initAddressData() {
        log.info("Creating address data");
        try {
            ClassPathResource resource = new ClassPathResource("data.sql");
            BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream()));

            List<String> batchStatements = new ArrayList<>();
            StringBuilder sqlStatement = new StringBuilder();

            String line;

            while ((line = reader.readLine()) != null) {
                line = line.trim();
                if (line.isEmpty() || line.startsWith("--")) {
                    continue;
                }

                sqlStatement.append(line).append(" ");
                if (line.endsWith(";")) {
                    batchStatements.add(sqlStatement.toString());
                    sqlStatement.setLength(0);

                    if (batchStatements.size() >= BATCH_SIZE) {
                        executeBatch(batchStatements);
                        batchStatements.clear();
                    }
                }
            }

            if (!batchStatements.isEmpty()) {
                executeBatch(batchStatements);
            }
            log.info("Successfully created address data");
        } catch (Exception e){
            e.printStackTrace();
            log.error(e.getMessage());
        }
    }


    void executeBatch(List<String> batchStatements) {
        try {
            jdbcTemplate.batchUpdate(batchStatements.toArray(new String[0]));
            System.out.println("Executed batch of " + batchStatements.size() + " SQL statements.");
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error executing batch: " + e.getMessage());
        }
    }

    //@PostConstruct
    @Transactional
    public void initCinemaData() {
        CinemaDTO cinema1 = cinemaService.createCinema(CinemaDTO.builder()
                        .cinemaName("Galaxy Quận 1")
                        .cinemaDistrict("Quận 1")
                        .cinemaProvince("Thành phố Hồ Chí Minh")
                        .cinemaWard("Phường Bến Nghé")
                        .cinemaStreet("100 Võ Thị Sáu")
                .build());

        CinemaDTO cinema2 = cinemaService.createCinema(CinemaDTO.builder()
                .cinemaName("Galaxy Bình Thạnh")
                .cinemaDistrict("Quận Bình Thạnh")
                .cinemaProvince("Thành phố Hồ Chí Minh")
                .cinemaWard("Phường 12")
                .cinemaStreet("134 Điện Biên Phủ")
                .build());

        CinemaDTO cinema3 = cinemaService.createCinema(CinemaDTO.builder()
                .cinemaName("Galaxy Thủ Đức")
                .cinemaDistrict("Thành phố Thủ Đức")
                .cinemaProvince("Thành phố Hồ Chí Minh")
                .cinemaWard("Phường Hiệp Bình Chánh")
                .cinemaStreet("300 Phạm Văn Đồng")
                .build());



        cinemaService.createHall(CreateCinemaHallRequest.builder()
                        .cinemaId(cinema1.getCinemaId())
                        .cinemaHallName("RAP 1")
                        .seats(new HashMap<SeatTypeEnum, Integer>() {{
                            put(SeatTypeEnum.STANDARD, 16 * 8);
                            put(SeatTypeEnum.COUPLE, 8);
                        }})
                .build());

        cinemaService.createHall(CreateCinemaHallRequest.builder()
                .cinemaId(cinema1.getCinemaId())
                .cinemaHallName("RAP 2")
                .seats(new HashMap<SeatTypeEnum, Integer>() {{
                    put(SeatTypeEnum.STANDARD, 16 * 7);
                    put(SeatTypeEnum.COUPLE, 8);
                }})
                .build());

        cinemaService.createHall(CreateCinemaHallRequest.builder()
                .cinemaId(cinema1.getCinemaId())
                .cinemaHallName("RAP 3")
                .seats(new HashMap<SeatTypeEnum, Integer>() {{
                    put(SeatTypeEnum.STANDARD, 16 * 7);
                    put(SeatTypeEnum.COUPLE, 8);
                }})
                .build());



        cinemaService.createHall(CreateCinemaHallRequest.builder()
                .cinemaId(cinema2.getCinemaId())
                .cinemaHallName("RAP 1")
                .seats(new HashMap<SeatTypeEnum, Integer>() {{
                    put(SeatTypeEnum.STANDARD, 16 * 8);
                    put(SeatTypeEnum.COUPLE, 8);
                }})
                .build());

        cinemaService.createHall(CreateCinemaHallRequest.builder()
                .cinemaId(cinema2.getCinemaId())
                .cinemaHallName("RAP 2")
                .seats(new HashMap<SeatTypeEnum, Integer>() {{
                    put(SeatTypeEnum.STANDARD, 16 * 7);
                    put(SeatTypeEnum.COUPLE, 8);
                }})
                .build());

        cinemaService.createHall(CreateCinemaHallRequest.builder()
                .cinemaId(cinema2.getCinemaId())
                .cinemaHallName("RAP 3")
                .seats(new HashMap<SeatTypeEnum, Integer>() {{
                    put(SeatTypeEnum.STANDARD, 16 * 7);
                    put(SeatTypeEnum.COUPLE, 8);
                }})
                .build());

        cinemaService.createHall(CreateCinemaHallRequest.builder()
                .cinemaId(cinema3.getCinemaId())
                .cinemaHallName("RAP 1")
                .seats(new HashMap<SeatTypeEnum, Integer>() {{
                    put(SeatTypeEnum.STANDARD, 16 * 8);
                    put(SeatTypeEnum.COUPLE, 8);
                }})
                .build());

        cinemaService.createHall(CreateCinemaHallRequest.builder()
                .cinemaId(cinema3.getCinemaId())
                .cinemaHallName("RAP 2")
                .seats(new HashMap<SeatTypeEnum, Integer>() {{
                    put(SeatTypeEnum.STANDARD, 16 * 7);
                    put(SeatTypeEnum.COUPLE, 8);
                }})
                .build());

        cinemaService.createHall(CreateCinemaHallRequest.builder()
                .cinemaId(cinema3.getCinemaId())
                .cinemaHallName("RAP 3")
                .seats(new HashMap<SeatTypeEnum, Integer>() {{
                    put(SeatTypeEnum.STANDARD, 16 * 7);
                    put(SeatTypeEnum.COUPLE, 8);
                }})
                .build());
    }

    //@PostConstruct
    public void initMovieDate() {
        MovieEntity movieEntity = MovieEntity.builder()
                .movieName("Địa Đạo: Mặt Trời Trong Bóng Tối")
                .movieDescription("Địa Đạo: Mặt Trời Trong Bóng Tối là dự án điện ảnh kỷ niệm 50 năm hòa bình thống nhất đất nước, dự kiến khởi chiếu 30.04.2025. Phim do đạo diễn Bùi Thạc Chuyên cầm trịch, với sự tham gia của dàn diễn viên thực lực – Thái Hòa, Quang Tuấn và diễn viên trẻ Hồ Thu Anh. Vào năm 1967, chiến tranh Việt Nam ngày càng khốc liệt. Đội du kích 21 người do BẢY THEO chỉ huy tại căn cứ Bình An Đông trở thành mục tiêu mà quân đội Mỹ TÌM VÀ DIỆT số 1 khi nhận nhiệm vụ bằng mọi giá phải bảo vệ một nhóm thông tin tình báo chiến lược mới đến ẩn náu tại căn cứ. Các cuộc liên lạc vô tuyến điện từ với nhóm tình báo bị quân đội Mỹ phát hiện và định vị, lấy đi lợi thế duy nhất của đội du kích là sự vô hình trong hệ thống địa đạo rộng khắp, phức tạp và bí ẩn. Bộ phim là những câu chuyện đan xen giữa tình đồng đội, tình yêu và khát khao sống ở những người lính. Trên hết, vẫn là nghĩa vụ và sự hi sinh vì Tổ Quốc. Đạo diễn Bùi Thạc Chuyên nung nấu 10 năm trời để chuẩn bị cho phim điện ảnh Địa Đạo, đem câu chuyện huyền thoại về nhân dân miền Nam tài trí thông minh và tinh thần yêu nước ngoan cường ngày ấy lên màn ảnh rộng. Lịch sử đã chứng minh, dẫu cho trên đầu là bom rơi đạn nổ, dưới hầm là không khí đặc quánh đến hít thở cũng khó khăn, chỉ cần trong tim mỗi người chiến sĩ luôn hướng đến ánh sáng tự do của một dân tộc tự do trong tương lai, họ sẽ kiên trì đứng vững mà chiến đấu. Như có mặt trời trong bóng tối luôn soi sáng dẫn đường. Phim mới Địa Đạo: Mặt Trời Trong Bóng Tối suất chiếu sớm 2-3.4.2025 (Không áp dụng Movie Voucher), dự kiến ra mắt tại các rạp chiếu phim toàn quốc từ 04.04.2025.")
                .movieAge(16)
                .movieThumbnail("http://localhost:9000/movies/-1357775792985083904")
                .movieTrailer("https://youtu.be/ZjWI5zinZzI")
                .movieRating(BigDecimal.ZERO)
                .movieDuration(128)
                .movieLanguage("Tiếng Việt")
                .movieCountry("Việt Nam")
                .movieReleaseDate(LocalDate.parse("2025-04-02"))
                .movieDirector("Bùi Thạc Chuyên")
                .movieProducer("HK Film, Galaxy Studio")
                .build();

        movieRepository.save(movieEntity);
    }
}

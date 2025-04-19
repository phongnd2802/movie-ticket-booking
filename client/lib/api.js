// This file contains functions to fetch data from the API

/**
 * Fetch movie details by ID
 * @param {string|number} id - The movie ID
 * @returns {Promise<Object>} - The movie data
 */
export async function fetchMovieDetails(id) {
  // In a real application, this would be an actual API call
  // For now, we'll simulate a response based on the sample data

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return mock data based on the sample response
  return {
    code: 20000,
    message: "success",
    metadata: {
      movieId: Number.parseInt(id),
      movieName: "Địa Đạo: Mặt Trời Trong Bóng Tối",
      movieDescription:
        "Địa Đạo: Mặt Trời Trong Bóng Tối là dự án điện ảnh kỷ niệm 50 năm hòa bình thống nhất đất nước, dự kiến khởi chiếu 30.04.2025. Phim do đạo diễn Bùi Thạc Chuyên cầm trịch, với sự tham gia của dàn diễn viên thực lực – Thái Hòa, Quang Tuấn và diễn viên trẻ Hồ Thu Anh. Vào năm 1967, chiến tranh Việt Nam ngày càng khốc liệt. Đội du kích 21 người do BẢY THEO chỉ huy tại căn cứ Bình An Đông trở thành mục tiêu mà quân đội Mỹ TÌM VÀ DIỆT số 1 khi nhận nhiệm vụ bằng mọi giá phải bảo vệ một nhóm thông tin tình báo chiến lược mới đến ẩn náu tại căn cứ. Các cuộc liên lạc vô tuyến điện từ với nhóm tình báo bị quân đội Mỹ phát hiện và định vị, lấy đi lợi thế duy nhất của đội du kích là sự vô hình trong hệ thống địa đạo rộng khắp, phức tạp và bí ẩn. Bộ phim là những câu chuyện đan xen giữa tình đồng đội, tình yêu và khát khao sống ở những người lính. Trên hết, vẫn là nghĩa vụ và sự hi sinh vì Tổ Quốc. Đạo diễn Bùi Thạc Chuyên nung nấu 10 năm trời để chuẩn bị cho phim điện ảnh Địa Đạo, đem câu chuyện huyền thoại về nhân dân miền Nam tài trí thông minh và tinh thần yêu nước ngoan cường ngày ấy lên màn ảnh rộng. Lịch sử đã chứng minh, dẫu cho trên đầu là bom rơi đạn nổ, dưới hầm là không khí đặc quánh đến hít thở cũng khó khăn, chỉ cần trong tim mỗi người chiến sĩ luôn hướng đến ánh sáng tự do của một dân tộc tự do trong tương lai, họ sẽ kiên trì đứng vững mà chiến đấu. Như có mặt trời trong bóng tối luôn soi sáng dẫn đường. Phim mới Địa Đạo: Mặt Trời Trong Bóng Tối suất chiếu sớm 2-3.4.2025 (Không áp dụng Movie Voucher), dự kiến ra mắt tại các rạp chiếu phim toàn quốc từ 04.04.2025.",
      movieAge: 16,
      movieThumbnail: "/emiu.jpg?height=450&width=300",
      movieTrailer: "https://youtu.be/ZjWI5zinZzI",
      movieRating: 8.7,
      movieDuration: 128,
      movieLanguage: "Tiếng Việt",
      movieCountry: "Việt Nam",
      movieReleaseDate: "2025-04-02",
      movieDirector: "Bùi Thạc Chuyên",
      movieProducer: "HK Film, Galaxy Studio",
      genres: ["Hành động", "Chiến tranh", "Lịch sử"],
      actors: ["Thái Hòa", "Quang Tuấn", "Hồ Thu Anh"],
      shows: [
        {
          showId: 1,
          showStartTime: "2025-04-10T08:30",
          showEndTime: "2025-04-10T10:38",
          cinemaHall: {
            cinemaHallId: 7,
            cinemaHallName: "RAP 1",
            cinema: {
              cinemaId: 3,
              cinemaName: "Galaxy Thủ Đức",
              cinemaStreet: "300 Phạm Văn Đồng",
              cinemaProvince: "Thành phố Hồ Chí Minh",
              cinemaDistrict: "Thành phố Thủ Đức",
              cinemaWard: "Phường Hiệp Bình Chánh",
            },
          },
        },
        {
          showId: 2,
          showStartTime: "2025-04-10T11:00",
          showEndTime: "2025-04-10T13:08",
          cinemaHall: {
            cinemaHallId: 7,
            cinemaHallName: "RAP 1",
            cinema: {
              cinemaId: 3,
              cinemaName: "Galaxy Thủ Đức",
              cinemaStreet: "300 Phạm Văn Đồng",
              cinemaProvince: "Thành phố Hồ Chí Minh",
              cinemaDistrict: "Thành phố Thủ Đức",
              cinemaWard: "Phường Hiệp Bình Chánh",
            },
          },
        },
        {
          showId: 3,
          showStartTime: "2025-04-10T14:30",
          showEndTime: "2025-04-10T16:38",
          cinemaHall: {
            cinemaHallId: 8,
            cinemaHallName: "RAP 2",
            cinema: {
              cinemaId: 3,
              cinemaName: "Galaxy Thủ Đức",
              cinemaStreet: "300 Phạm Văn Đồng",
              cinemaProvince: "Thành phố Hồ Chí Minh",
              cinemaDistrict: "Thành phố Thủ Đức",
              cinemaWard: "Phường Hiệp Bình Chánh",
            },
          },
        },
        {
          showId: 4,
          showStartTime: "2025-04-11T09:30",
          showEndTime: "2025-04-11T11:38",
          cinemaHall: {
            cinemaHallId: 2,
            cinemaHallName: "Cinema 2",
            cinema: {
              cinemaId: 1,
              cinemaName: "CGV Landmark 81",
              cinemaStreet: "Landmark 81, Vinhomes Central Park",
              cinemaProvince: "Thành phố Hồ Chí Minh",
              cinemaDistrict: "Quận Bình Thạnh",
              cinemaWard: "Phường 22",
            },
          },
        },
      ],
    },
  };
}

/**
 * Fetch actor details by name
 * @param {string} actorName - The actor's name
 * @returns {Promise<Object>} - The actor data
 */
export async function fetchActorDetails(actorName) {
  // In a real application, this would be an actual API call
  // For now, we'll simulate a response with mock data

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Mock actor data based on name
  const actorMap = {
    "Thái Hòa": {
      actorId: 1,
      actorName: "Thái Hòa",
      character: "Bảy Theo",
      actorImage: "/emiu.jpg?height=400&width=300",
      actorBirthDate: "1969-09-15",
      bio: "Thái Hòa là một diễn viên, đạo diễn và nhà sản xuất phim người Việt Nam. Anh được biết đến qua các vai diễn trong nhiều bộ phim hài và tâm lý xã hội ăn khách như Để Mai tính, Tèo em, Cưới ngay kẻo lỡ, và Em chưa 18.",
      films: [
        {
          filmId: 1,
          title: "Em Chưa 18",
          posterImage: "/emiu.jpg?height=300&width=200",
          releaseYear: 2017,
          rating: 8.2,
        },
        {
          filmId: 2,
          title: "Tiệc Trăng Máu",
          posterImage: "/emiu.jpg?height=300&width=200",
          releaseYear: 2020,
          rating: 8.0,
        },
      ],
      awards: [
        "Cánh Diều Vàng cho Nam diễn viên chính xuất sắc nhất",
        "Giải Mai Vàng cho Nam diễn viên điện ảnh được yêu thích nhất",
      ],
    },
    "Quang Tuấn": {
      actorId: 2,
      actorName: "Quang Tuấn",
      character: "Đại úy Mỹ",
      actorImage: "/emiu.jpg?height=400&width=300",
      actorBirthDate: "1984-05-20",
      bio: "Quang Tuấn là diễn viên điện ảnh và truyền hình người Việt Nam. Anh được biết đến qua các vai diễn trong phim Quả tim máu, Song lang và Chị chị em em.",
      films: [
        {
          filmId: 3,
          title: "Song Lang",
          posterImage: "/emiu.jpg?height=300&width=200",
          releaseYear: 2018,
          rating: 7.8,
        },
      ],
      awards: ["Giải thưởng Ngôi Sao Xanh cho Nam diễn viên phụ xuất sắc"],
    },
    "Hồ Thu Anh": {
      actorId: 3,
      actorName: "Hồ Thu Anh",
      character: "Lan",
      actorImage: "/emiu.jpg?height=400&width=300",
      actorBirthDate: "1995-11-10",
      bio: "Hồ Thu Anh là diễn viên trẻ đầy triển vọng của điện ảnh Việt Nam. Cô từng tham gia một số phim như Cô gái đến từ hôm qua và Tháng năm rực rỡ.",
      films: [
        {
          filmId: 4,
          title: "Tháng Năm Rực Rỡ",
          posterImage: "/emiu.jpg?height=300&width=200",
          releaseYear: 2018,
          rating: 7.5,
        },
      ],
      awards: [],
    },
  };

  return (
    actorMap[actorName] || {
      actorId: Math.floor(Math.random() * 1000),
      actorName: actorName,
      character: "Unknown",
      actorImage: "/emiu.jpg?height=400&width=300",
      actorBirthDate: null,
      bio: "No biography available.",
      films: [],
      awards: [],
    }
  );
}

/**
 * Fetch related movies
 * @returns {Promise<Array>} - Array of related movies
 */
export async function fetchRelatedMovies() {
  // In a real application, this would be an actual API call
  // For now, we'll simulate a response with mock data

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  // Return mock data
  return [
    {
      movieId: 2,
      movieName: "Mật Vụ Phụ Hồ",
      movieThumbnail: "/emiu.jpg?height=450&width=300",
      movieRating: 9.4,
      movieAge: 18,
    },
    {
      movieId: 3,
      movieName: "Godzilla x Kong: Đế Chế Mới",
      movieThumbnail: "/emiu.jpg?height=450&width=300",
      movieRating: 7.9,
      movieAge: 13,
    },
  ];
}

/**
 * Fetch show details by ID
 * @param {string|number} id - The show ID
 * @returns {Promise<Object>} - The show details
 */
export async function fetchShowDetails(id) {
  // In a real application, this would be an actual API call
  // For now, we'll simulate a response with mock data

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return mock data
  return {
    showId: Number.parseInt(id),
    movieId: 1,
    movieName: "Địa Đạo: Mặt Trời Trong Bóng Tối",
    movieFormat: "2D Phụ Đề",
    movieRating: "T16",
    movieThumbnail: "/emiu.jpg?height=300&width=200",
    showTime: "10:15",
    showDate: "2025-04-12",
    cinemaName: "Galaxy Nguyễn Du",
    cinemaHall: "RẠP 2",
    seatMap: {
      rows: "ABCDEFGHIJKLMNOP",
      columns: 25,
      unavailableSeats: [
        "K13",
        "K14",
        "J13",
        "J14",
        "I13",
        "I14",
        "I15",
        "H7",
        "H8",
        "H9",
        "H10",
        "H11",
        "H12",
        "H13",
        "H14",
        "H15",
        "G11",
        "G12",
        "G13",
        "G14",
        "G15",
        "F13",
        "F14",
      ],
      vipSeats: ["F", "G", "H", "I", "J"],
      coupleSeats: ["O", "P"],
    },
    pricing: {
      standard: 90000,
      vip: 120000,
      couple: 180000,
    },
  };
}

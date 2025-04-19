// Mock API functions for movie management

// Simulated delay to mimic API calls
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Sample movie data
let movies = [
  {
    movieId: 1,
    movieName: "Địa Đạo: Mặt Trời Trong Bóng Tối",
    movieDescription:
      "Địa Đạo: Mặt Trời Trong Bóng Tối là dự án điện ảnh kỷ niệm 50 năm hòa bình thống nhất đất nước, dự kiến khởi chiếu 30.04.2025.",
    movieAge: 16,
    movieThumbnail: "/abstract-film-festival.png",
    movieTrailer: "https://youtu.be/ZjWI5zinZzI",
    movieDuration: 128,
    movieLanguage: "Tiếng Việt",
    movieCountry: "Việt Nam",
    movieReleaseDate: "2025-04-02",
    movieDirector: "Bùi Thạc Chuyên",
    movieProducer: "HK Film, Galaxy Studio",
  },
  {
    movieId: 2,
    movieName: "Mật Vụ Phụ Hồ",
    movieDescription: "Một bộ phim hài hành động Việt Nam.",
    movieAge: 18,
    movieThumbnail: "/urban-escape.png",
    movieTrailer: "https://youtu.be/example",
    movieDuration: 115,
    movieLanguage: "Tiếng Việt",
    movieCountry: "Việt Nam",
    movieReleaseDate: "2025-05-15",
    movieDirector: "Nguyễn Văn A",
    movieProducer: "Studio XYZ",
  },
  {
    movieId: 3,
    movieName: "Godzilla x Kong: Đế Chế Mới",
    movieDescription:
      "Hai quái vật huyền thoại đối đầu trong một cuộc chiến sử thi.",
    movieAge: 13,
    movieThumbnail: "/colossal-shadow.png",
    movieTrailer: "https://youtu.be/example2",
    movieDuration: 142,
    movieLanguage: "Tiếng Anh",
    movieCountry: "Mỹ",
    movieReleaseDate: "2025-03-10",
    movieDirector: "John Smith",
    movieProducer: "Legendary Pictures",
  },
];

/**
 * Fetch movies with pagination and filtering
 */
export async function fetchMovies({
  page = 0,
  size = 10,
  search = "",
  status = undefined,
}) {
  await delay(800); // Simulate network delay

  let filteredMovies = [...movies];

  // Apply search filter
  if (search) {
    filteredMovies = filteredMovies.filter(
      (movie) =>
        movie.movieName.toLowerCase().includes(search.toLowerCase()) ||
        movie.movieDirector.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Apply status filter
  if (status) {
    const now = new Date();

    filteredMovies = filteredMovies.filter((movie) => {
      const releaseDate = new Date(movie.movieReleaseDate);

      if (status === "upcoming") {
        return releaseDate > now;
      } else if (status === "active") {
        return (
          releaseDate <= now &&
          releaseDate > new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
        );
      } else if (status === "archived") {
        return (
          releaseDate <= new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
        );
      }

      return true;
    });
  }

  // Calculate pagination
  const totalElements = filteredMovies.length;
  const totalPages = Math.ceil(totalElements / size);
  const startIndex = page * size;
  const endIndex = startIndex + size;

  // Get paginated results
  const content = filteredMovies.slice(startIndex, endIndex);

  return {
    content,
    page,
    size,
    totalElements,
    totalPages,
  };
}

/**
 * Create a new movie
 */
export async function createMovie(movieData) {
  await delay(1000); // Simulate network delay

  // In a real app, this would be an API call
  const newMovie = {
    movieId: movies.length + 1,
    ...Object.fromEntries(movieData.entries()),
    movieThumbnail: "/cosmic-odyssey.png",
  };

  movies.push(newMovie);
  return newMovie;
}

/**
 * Update an existing movie
 */
export async function updateMovie(movieId, movieData) {
  await delay(1000); // Simulate network delay

  // In a real app, this would be an API call
  const index = movies.findIndex((movie) => movie.movieId === movieId);

  if (index === -1) {
    throw new Error("Movie not found");
  }

  const updatedMovie = {
    ...movies[index],
    ...Object.fromEntries(movieData.entries()),
  };

  // Keep the existing thumbnail if no new one was provided
  if (!movieData.get("movieThumbnail")) {
    updatedMovie.movieThumbnail = movies[index].movieThumbnail;
  } else {
    updatedMovie.movieThumbnail = "/cosmic-heroes-reborn.png";
  }

  movies[index] = updatedMovie;
  return updatedMovie;
}

/**
 * Delete a movie
 */
export async function deleteMovie(movieId) {
  await delay(800); // Simulate network delay

  // In a real app, this would be an API call
  const index = movies.findIndex((movie) => movie.movieId === movieId);

  if (index === -1) {
    throw new Error("Movie not found");
  }

  movies = movies.filter((movie) => movie.movieId !== movieId);
  return { success: true };
}

/**
 * Get a single movie by ID
 */
export async function getMovie(movieId) {
  await delay(500); // Simulate network delay

  const movie = movies.find((movie) => movie.movieId === movieId);

  if (!movie) {
    throw new Error("Movie not found");
  }

  return movie;
}

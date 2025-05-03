"use client";

import { useState } from "react";
import Movie from "@/components/page/movie";

export default function ListMovie({ movies, className }) {
  const [visibleMovies, setVisibleMovies] = useState(8);

  const loadMore = () => {
    setVisibleMovies((prev) => prev + 4);
  };

  return (
    <div className={`w-full ${className || ""}`}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.slice(0, visibleMovies).map((movie) => (
          <Movie
            key={movie.movieId}
            width={300}
            height={450}
            image={movie.movieThumbnail}
            title={movie.movieName}
            trailer={movie.movieTrailer}
            id={movie.movieId}
          />
        ))}
      </div>

      {visibleMovies < movies.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="px-6 py-2 bg-[#034ea2] text-white rounded-md hover:bg-[#0366d6] transition-colors"
          >
            Xem thêm
          </button>
        </div>
      )}
    </div>
  );
}

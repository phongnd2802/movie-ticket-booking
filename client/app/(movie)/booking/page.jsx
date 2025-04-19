"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchRelatedMovies } from "@/lib/api";

export default function MovieDetailRedirect() {
  const router = useRouter();
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        // Fetch related/featured movies
        const moviesData = await fetchRelatedMovies();
        setRelatedMovies(moviesData);

        // If we have movies, redirect to the first one
        if (moviesData && moviesData.length > 0) {
          router.push(`/booking/${moviesData[0].movieId}`);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error loading movies:", err);
        setLoading(false);
      }
    };

    loadMovies();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Loading Movies...</h2>
          <div className="animate-pulse h-2 w-48 bg-gray-300 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Movie Listings</h2>
        <p className="mb-6">Please select a movie from our collection</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {relatedMovies.map((movie) => (
            <div
              key={movie.movieId}
              className="cursor-pointer p-4 border rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => router.push(`/booking/${movie.movieId}`)}
            >
              <h3 className="font-medium">{movie.movieName}</h3>
              <p className="text-sm text-muted-foreground">
                Rating: {movie.movieRating.toFixed(1)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { HeroBanner } from "@/components/movie/hero-banner";
import { MovieContent } from "@/components/movie/movie-content";
import { NowShowingSection } from "@/components/movie/now-showing-section";
import { VideoModal } from "@/components/movie/video-modal";
import { CastModal } from "@/components/movie/cast-modal";
import { getMovieById } from "@/endpoint/auth";
import {
  // fetchMovieDetails,
  fetchActorDetails,
  fetchRelatedMovies,
} from "@/lib/api";
import axios from "axios";

export default function MovieDetailPage({ params }) {
  const { movieId } = params;
  const [movieData, setMovieData] = useState(null);
  const [actorsData, setActorsData] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [videoOpen, setVideoOpen] = useState(false);
  const [castModalOpen, setCastModalOpen] = useState(false);
  const [selectedCast, setSelectedCast] = useState(null);
  const [activeDate, setActiveDate] = useState(null);

  // Fetch movie data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Fetch movie details
        const mvRp = async () => {
          const response = await axios.get(
            getMovieById(movieId),

            {
              headers: {
                "content-type": "application/json",
              },
            }
          );
          if (!response.status === 200) {
            throw new Error("Failed to fetch movie details");
          }
          return await response.data;
        };
        const movieResponse = await mvRp();
        console.log("movieResponse", movieResponse);
        setMovieData(movieResponse.metadata);

        // Set initial active date based on first available show date
        if (
          movieResponse.metadata.shows &&
          movieResponse.metadata.shows.length > 0
        ) {
          const firstShowDate = new Date(
            movieResponse.metadata.shows[0].showStartTime
          );
          setActiveDate(firstShowDate.toISOString().split("T")[0]);
        }

        // Fetch actor details for each actor in the movie
        if (
          movieResponse.metadata.actors &&
          movieResponse.metadata.actors.length > 0
        ) {
          const actorDetailsPromises = movieResponse.metadata.actors.map(
            (actorName) => fetchActorDetails(actorName)
          );
          const actorsDetails = await Promise.all(actorDetailsPromises);
          setActorsData(actorsDetails);
        }

        // Fetch related movies
        const relatedMoviesData = await fetchRelatedMovies();
        setRelatedMovies(relatedMoviesData);

        setLoading(false);
      } catch (err) {
        console.error("Error loading movie data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (movieId) {
      loadData();
    }
  }, [movieId]);

  const openCastModal = (actor) => {
    setSelectedCast(actor);
    setCastModalOpen(true);
  };

  // Generate unique dates from showtimes
  const getUniqueDates = () => {
    if (!movieData || !movieData.shows || movieData.shows.length === 0)
      return [];

    const uniqueDates = [
      ...new Set(
        movieData.shows.map((show) => {
          const date = new Date(show.showStartTime);
          return date.toISOString().split("T")[0];
        })
      ),
    ];

    return uniqueDates.map((dateString) => {
      const date = new Date(dateString);
      return {
        date: dateString,
        day: formatDay(date),
        formattedDate: formatDate(date),
      };
    });
  };

  const formatDay = (date) => {
    const days = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ];
    return days[date.getDay()];
  };

  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Loading Movie Details...
          </h2>
          <div className="animate-pulse h-2 w-48 bg-gray-300 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Error Loading Movie</h2>
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => (window.location.href = "/booking")}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
          >
            Return to Movie List
          </button>
        </div>
      </div>
    );
  }

  if (!movieData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Movie Not Found</h2>
          <p>The movie you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => (window.location.href = "/booking")}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
          >
            Return to Movie List
          </button>
        </div>
      </div>
    );
  }

  const dates = getUniqueDates();

  return (
    <div className="min-h-screen bg-background">
      <HeroBanner
        thumbnailUrl={movieData.movieThumbnail}
        onPlayVideo={() => setVideoOpen(true)}
      />

      <div className="container px-4 py-8 md:px-6">
        <div className="grid gap-8 md:grid-cols-[1fr_300px]">
          <MovieContent
            movie={movieData}
            actors={actorsData}
            openCastModal={openCastModal}
            activeDate={activeDate}
            setActiveDate={setActiveDate}
            dates={dates}
          />
          <NowShowingSection movies={relatedMovies} />
        </div>
      </div>

      <VideoModal
        open={videoOpen}
        onOpenChange={setVideoOpen}
        trailerUrl={movieData.movieTrailer}
      />

      <CastModal
        open={castModalOpen}
        onOpenChange={setCastModalOpen}
        actor={selectedCast}
      />
    </div>
  );
}

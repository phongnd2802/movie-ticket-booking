"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function MovieHeader({ movie, actors, openCastModal }) {
  if (!movie) {
    return <div className="p-4">Loading movie details...</div>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Coming soon";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
    } catch (e) {
      return "Coming soon";
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-[300px_1fr] lg:gap-12">
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] w-full max-w-[300px] overflow-hidden rounded-lg border shadow-lg md:mt-[-150px]">
        <Image
          src={movie.movieThumbnail || "/placeholder.svg?height=450&width=300"}
          alt={movie.movieName || "Movie Poster"}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Movie Details */}
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-orange-500 text-white">
              {movie.movieAge || "G"}+
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {movie.movieName || "Movie Title"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-bold">
                {(movie.movieRating || 0).toFixed(1)}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">(101 votes)</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Thời lượng</p>
            <p className="font-medium">{movie.movieDuration || 0} phút</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Ngày phát hành</p>
            <p className="font-medium">{formatDate(movie.movieReleaseDate)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Quốc gia</p>
            <p className="font-medium">{movie.movieCountry || "Unknown"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Sản xuất</p>
            <p className="font-medium">{movie.movieProducer || "Unknown"}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Thể loại</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {(movie.genres || []).map((genre, index) => (
              <Badge key={index} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Đạo diễn</p>
          <p className="font-medium">{movie.movieDirector || "Unknown"}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Diễn viên</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(actors || []).map((actor, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-muted transition-colors"
                onClick={() => openCastModal(actor)}
              >
                {actor.actorName}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

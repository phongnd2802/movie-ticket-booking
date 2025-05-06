"use client";

import { Star, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import MyImage from "../page/imagekit";
import { useRouter } from "next/navigation";

export function NowShowingSection({ movies }) {
  const Router = useRouter();
  if (!movies || movies.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="h-1 w-2 bg-primary"></div>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          Không có phim đang chiếu
        </div>
      </div>
    );
  }

  const displayMovies = movies.slice(0, 2);

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="h-1 w-2 bg-primary"></div>
      </div>
      <div className="space-y-4">
        {displayMovies.map((movie) => (
          <MovieCard
            key={movie.movieId}
            id={movie.movieId}
            title={movie.movieName}
            rating={movie.movieRating}
            ageRating={movie.movieAge}
            thumbnail={movie.movieThumbnail}
          />
        ))}
      </div>
      <div className="pt-4">
        <Button
          variant="outline"
          className="w-full"
          size="sm"
          onClick={() => Router.push("/")}
        >
          Xem thêm
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function MovieCard({ id, title, rating, ageRating, thumbnail }) {
  return (
    <div
      className="group relative overflow-hidden rounded-lg cursor-pointer"
      onClick={() => (window.location.href = `/movie-detail/${id}`)}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
        <MyImage
          path={thumbnail || "/placeholder.svg?height=450&width=300"}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-white line-clamp-1">{title}</h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold text-white">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
      <Badge className="absolute right-2 top-2 bg-orange-500">
        {ageRating}+
      </Badge>
    </div>
  );
}

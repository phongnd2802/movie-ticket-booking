"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Film, Calendar, TrendingUp, Clock, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchMovies } from "@/lib/admin-api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalMovies: 0,
    upcomingMovies: 0,
    activeMovies: 0,
  });
  const [recentMovies, setRecentMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch movies for stats
        const allMovies = await fetchMovies({ size: 100 });
        const now = new Date();

        const upcoming = allMovies.content.filter((movie) => {
          const releaseDate = new Date(movie.movieReleaseDate);
          return releaseDate > now;
        }).length;

        const active = allMovies.content.filter((movie) => {
          const releaseDate = new Date(movie.movieReleaseDate);
          return (
            releaseDate <= now &&
            releaseDate > new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
          );
        }).length;

        setStats({
          totalMovies: allMovies.totalElements,
          upcomingMovies: upcoming,
          activeMovies: active,
        });

        // Get recent movies
        const recent = await fetchMovies({ page: 0, size: 5 });
        setRecentMovies(recent.content);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Movies</CardTitle>
            <Film className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : stats.totalMovies}
            </div>
            <p className="text-xs text-muted-foreground">Movies in database</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Movies
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : stats.upcomingMovies}
            </div>
            <p className="text-xs text-muted-foreground">
              Movies yet to be released
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Movies</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : stats.activeMovies}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently showing movies
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Movies */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Movies</CardTitle>
          <CardDescription>Latest movies added to the system</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-12 bg-gray-100 animate-pulse rounded-md"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {recentMovies.map((movie) => (
                <div
                  key={movie.movieId}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-14 bg-gray-100 rounded overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Film className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium">{movie.movieName}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(movie.movieReleaseDate)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {movie.movieDuration} min
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/movies?edit=${movie.movieId}`}>
                      Edit
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/admin/movies">
              View All Movies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

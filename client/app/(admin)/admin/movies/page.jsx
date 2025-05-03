"use client";

import { useState, useEffect } from "react";
import { Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MovieForm } from "@/components/admin/movie-form";
import { DeleteConfirmation } from "@/components/admin/delete-confirmation";
import { MovieTable } from "@/components/admin/movie-table";
import { fetchMovies, deleteMovie } from "@/lib/admin-api";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    loadMovies();
  }, [currentPage, searchTerm, filterStatus]);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const response = await fetchMovies({
        page: currentPage - 1,
        size: 10,
        search: searchTerm,
        status: filterStatus !== "all" ? filterStatus : undefined,
      });
      setMovies(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMovie = () => {
    setSelectedMovie(null);
    setIsFormOpen(true);
  };

  const handleEditMovie = (movie) => {
    setSelectedMovie(movie);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (movie) => {
    setSelectedMovie(movie);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteMovie(selectedMovie.movieId);
      loadMovies();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete movie:", error);
    }
  };

  const handleFormClose = (shouldRefresh = false) => {
    setIsFormOpen(false);
    if (shouldRefresh) {
      loadMovies();
    }
  };

  const filteredMovies = movies.filter((movie) =>
    movie.movieName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Movie Management</h1>
        <Button onClick={handleAddMovie}>
          <Plus className="h-4 w-4 mr-2" />
          Add Movie
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search movies..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Movies</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <MovieTable
          movies={filteredMovies}
          loading={loading}
          onEdit={handleEditMovie}
          onDelete={handleDeleteClick}
        />

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500">
            Showing {filteredMovies.length} of {movies.length} movies
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Movie Form Modal */}
      <MovieForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        movie={selectedMovie}
        isCreated={selectedMovie === null}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Movie"
        description={`Are you sure you want to delete "${selectedMovie?.movieName}"? This action cannot be undone.`}
      />
    </div>
  );
}

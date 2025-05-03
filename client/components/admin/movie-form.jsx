"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { FormField } from "@/components/admin/movie/form-field";
import { TagInput } from "@/components/admin/movie/tag-input";
import { ThumbnailUpload } from "@/components/admin/movie/thumbnail-upload";
import { useMovieForm } from "@/hooks/use-movie-form";

export function MovieForm({ isOpen, onClose, movie, isCreated = false }) {
  const {
    formData,
    thumbnailPreview,
    isSubmitting,
    errors,
    actorInput,
    genreInput,
    setActorInput,
    setGenreInput,
    handleChange,
    handleThumbnailChange,
    handleAddActor,
    handleRemoveActor,
    handleAddGenre,
    handleRemoveGenre,
    handleSubmit,
    clearThumbnail,
  } = useMovieForm(movie, onClose);

  return (
    <Dialog open={isOpen} onOpenChange={() => !isSubmitting && onClose(false)}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{movie ? "Edit Movie" : "Add New Movie"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {errors.form && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
              {errors.form}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <FormField
                id="movieName"
                label="Movie Name"
                value={formData.movieName}
                onChange={handleChange}
                error={errors.movieName}
                required
              />

              <FormField
                id="movieDescription"
                label="Description"
                value={formData.movieDescription}
                onChange={handleChange}
                error={errors.movieDescription}
                required
                multiline
                rows={5}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  id="movieAge"
                  label="Age Rating"
                  value={formData.movieAge}
                  onChange={handleChange}
                  error={errors.movieAge}
                  required
                  type="number"
                  min={0}
                />

                <FormField
                  id="movieDuration"
                  label="Duration (min)"
                  value={formData.movieDuration}
                  onChange={handleChange}
                  error={errors.movieDuration}
                  required
                  type="number"
                  min={1}
                />
              </div>

              <FormField
                id="movieTrailer"
                label="Trailer URL"
                value={formData.movieTrailer}
                onChange={handleChange}
                error={errors.movieTrailer}
                placeholder="https://youtube.com/..."
              />

              <FormField
                id="movieRating"
                label="Rating (0-10)"
                value={formData.movieRating}
                onChange={handleChange}
                error={errors.movieRating}
                type="number"
                min={0}
                max={10}
                step={0.1}
              />

              {isCreated === false && (
                <TagInput
                  label="Actors"
                  inputValue={actorInput}
                  onInputChange={setActorInput}
                  onAddTag={handleAddActor}
                  onRemoveTag={handleRemoveActor}
                  tags={formData.actors}
                  tagKey="actorName"
                  error={errors.actors}
                />
              )}

              <TagInput
                label="Genres"
                inputValue={genreInput}
                onInputChange={setGenreInput}
                onAddTag={handleAddGenre}
                onRemoveTag={handleRemoveGenre}
                tags={formData.genres}
                tagKey="genreName"
                error={errors.genres}
              />
            </div>

            <div className="space-y-4">
              <ThumbnailUpload
                thumbnailPreview={thumbnailPreview}
                onUploadClick={() =>
                  document.getElementById("movieThumbnail")?.click()
                }
                onClearThumbnail={clearThumbnail}
                error={errors.movieThumbnail}
                required={!movie}
              />
              <input
                id="movieThumbnail"
                name="movieThumbnail"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  id="movieLanguage"
                  label="Language"
                  value={formData.movieLanguage}
                  onChange={handleChange}
                  error={errors.movieLanguage}
                  required
                />

                <FormField
                  id="movieCountry"
                  label="Country"
                  value={formData.movieCountry}
                  onChange={handleChange}
                  error={errors.movieCountry}
                  required
                />
              </div>

              <FormField
                id="movieReleaseDate"
                label="Release Date"
                value={formData.movieReleaseDate}
                onChange={handleChange}
                error={errors.movieReleaseDate}
                required
                type="date"
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  id="movieDirector"
                  label="Director"
                  value={formData.movieDirector}
                  onChange={handleChange}
                  error={errors.movieDirector}
                  required
                />

                <FormField
                  id="movieProducer"
                  label="Producer"
                  value={formData.movieProducer}
                  onChange={handleChange}
                  error={errors.movieProducer}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onClose(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {movie ? "Update Movie" : "Add Movie"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

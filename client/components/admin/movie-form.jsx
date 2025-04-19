"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { createMovie, updateMovie } from "@/lib/admin-api";

export function MovieForm({ isOpen, onClose, movie }) {
  const [formData, setFormData] = useState({
    movieName: "",
    movieDescription: "",
    movieAge: 0,
    movieThumbnail: null,
    movieTrailer: "",
    movieDuration: 0,
    movieLanguage: "",
    movieCountry: "",
    movieReleaseDate: "",
    movieDirector: "",
    movieProducer: "",
  });
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (movie) {
      setFormData({
        movieName: movie.movieName || "",
        movieDescription: movie.movieDescription || "",
        movieAge: movie.movieAge || 0,
        movieThumbnail: null, // We don't set the file here
        movieTrailer: movie.movieTrailer || "",
        movieDuration: movie.movieDuration || 0,
        movieLanguage: movie.movieLanguage || "",
        movieCountry: movie.movieCountry || "",
        movieReleaseDate: movie.movieReleaseDate
          ? movie.movieReleaseDate.split("T")[0]
          : "",
        movieDirector: movie.movieDirector || "",
        movieProducer: movie.movieProducer || "",
      });
      setThumbnailPreview(movie.movieThumbnail || null);
    } else {
      resetForm();
    }
  }, [movie, isOpen]);

  const resetForm = () => {
    setFormData({
      movieName: "",
      movieDescription: "",
      movieAge: 0,
      movieThumbnail: null,
      movieTrailer: "",
      movieDuration: 0,
      movieLanguage: "",
      movieCountry: "",
      movieReleaseDate: "",
      movieDirector: "",
      movieProducer: "",
    });
    setThumbnailPreview(null);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, movieThumbnail: file }));
      setThumbnailPreview(URL.createObjectURL(file));

      // Clear error when field is edited
      if (errors.movieThumbnail) {
        setErrors((prev) => ({ ...prev, movieThumbnail: null }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.movieName.trim()) {
      newErrors.movieName = "Movie name is required";
    }

    if (!formData.movieDescription.trim()) {
      newErrors.movieDescription = "Description is required";
    }

    if (formData.movieAge < 0) {
      newErrors.movieAge = "Age must be a positive number";
    }

    if (!movie && !formData.movieThumbnail) {
      newErrors.movieThumbnail = "Thumbnail is required";
    }

    if (formData.movieDuration <= 0) {
      newErrors.movieDuration = "Duration must be greater than 0";
    }

    if (!formData.movieLanguage.trim()) {
      newErrors.movieLanguage = "Language is required";
    }

    if (!formData.movieCountry.trim()) {
      newErrors.movieCountry = "Country is required";
    }

    if (!formData.movieReleaseDate) {
      newErrors.movieReleaseDate = "Release date is required";
    }

    if (!formData.movieDirector.trim()) {
      newErrors.movieDirector = "Director is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData object for multipart/form-data submission
      const submitData = new FormData();

      // Append all form fields
      Object.keys(formData).forEach((key) => {
        if (key === "movieThumbnail" && formData[key]) {
          submitData.append(key, formData[key]);
        } else if (key !== "movieThumbnail") {
          submitData.append(key, formData[key]);
        }
      });

      if (movie) {
        // Update existing movie
        await updateMovie(movie.movieId, submitData);
      } else {
        // Create new movie
        await createMovie(submitData);
      }

      onClose(true); // Close with refresh flag
    } catch (error) {
      console.error("Error submitting movie:", error);
      // Handle API errors
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ form: "Failed to save movie. Please try again." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <div>
                <Label htmlFor="movieName">
                  Movie Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="movieName"
                  name="movieName"
                  value={formData.movieName}
                  onChange={handleChange}
                  className={errors.movieName ? "border-red-500" : ""}
                />
                {errors.movieName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.movieName}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="movieDescription">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="movieDescription"
                  name="movieDescription"
                  value={formData.movieDescription}
                  onChange={handleChange}
                  rows={5}
                  className={errors.movieDescription ? "border-red-500" : ""}
                />
                {errors.movieDescription && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.movieDescription}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="movieAge">
                    Age Rating <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="movieAge"
                    name="movieAge"
                    type="number"
                    value={formData.movieAge}
                    onChange={handleChange}
                    min="0"
                    className={errors.movieAge ? "border-red-500" : ""}
                  />
                  {errors.movieAge && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.movieAge}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="movieDuration">
                    Duration (min) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="movieDuration"
                    name="movieDuration"
                    type="number"
                    value={formData.movieDuration}
                    onChange={handleChange}
                    min="1"
                    className={errors.movieDuration ? "border-red-500" : ""}
                  />
                  {errors.movieDuration && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.movieDuration}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="movieTrailer">Trailer URL</Label>
                <Input
                  id="movieTrailer"
                  name="movieTrailer"
                  value={formData.movieTrailer}
                  onChange={handleChange}
                  placeholder="https://youtube.com/..."
                  className={errors.movieTrailer ? "border-red-500" : ""}
                />
                {errors.movieTrailer && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.movieTrailer}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="movieThumbnail">
                  Thumbnail {!movie && <span className="text-red-500">*</span>}
                </Label>
                <div className="mt-2">
                  {thumbnailPreview ? (
                    <div className="relative w-full h-[200px] mb-4">
                      <Image
                        src={thumbnailPreview || "/placeholder.svg"}
                        alt="Thumbnail preview"
                        fill
                        className="object-cover rounded-md"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full"
                        onClick={() => {
                          setThumbnailPreview(null);
                          setFormData((prev) => ({
                            ...prev,
                            movieThumbnail: null,
                          }));
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-gray-50 ${
                        errors.movieThumbnail
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      onClick={() =>
                        document.getElementById("movieThumbnail").click()
                      }
                    >
                      <Upload className="h-8 w-8 mx-auto text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  )}
                  <input
                    id="movieThumbnail"
                    name="movieThumbnail"
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                  />
                  {errors.movieThumbnail && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.movieThumbnail}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="movieLanguage">
                    Language <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="movieLanguage"
                    name="movieLanguage"
                    value={formData.movieLanguage}
                    onChange={handleChange}
                    className={errors.movieLanguage ? "border-red-500" : ""}
                  />
                  {errors.movieLanguage && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.movieLanguage}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="movieCountry">
                    Country <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="movieCountry"
                    name="movieCountry"
                    value={formData.movieCountry}
                    onChange={handleChange}
                    className={errors.movieCountry ? "border-red-500" : ""}
                  />
                  {errors.movieCountry && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.movieCountry}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="movieReleaseDate">
                  Release Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="movieReleaseDate"
                  name="movieReleaseDate"
                  type="date"
                  value={formData.movieReleaseDate}
                  onChange={handleChange}
                  className={errors.movieReleaseDate ? "border-red-500" : ""}
                />
                {errors.movieReleaseDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.movieReleaseDate}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="movieDirector">
                    Director <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="movieDirector"
                    name="movieDirector"
                    value={formData.movieDirector}
                    onChange={handleChange}
                    className={errors.movieDirector ? "border-red-500" : ""}
                  />
                  {errors.movieDirector && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.movieDirector}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="movieProducer">Producer</Label>
                  <Input
                    id="movieProducer"
                    name="movieProducer"
                    value={formData.movieProducer}
                    onChange={handleChange}
                    className={errors.movieProducer ? "border-red-500" : ""}
                  />
                  {errors.movieProducer && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.movieProducer}
                    </p>
                  )}
                </div>
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

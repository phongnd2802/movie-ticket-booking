"use client";

import { useState, useEffect } from "react";
import axiosClient from "@/lib/auth/axiosClient";
import { createMovie } from "@/endpoint/auth";

const initialFormData = {
  movieName: "",
  movieDescription: "",
  movieAge: 0,
  movieThumbnail: null,
  movieTrailer: "",
  movieRating: 0,
  movieDuration: 0,
  movieLanguage: "",
  movieCountry: "",
  movieReleaseDate: "",
  movieDirector: "",
  movieProducer: "",
  actors: [],
  genres: [],
};

export function useMovieForm(movie, onClose) {
  const [formData, setFormData] = useState(initialFormData);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [actorInput, setActorInput] = useState("");
  const [genreInput, setGenreInput] = useState("");

  useEffect(() => {
    if (movie) {
      setFormData({
        movieName: movie.movieName || "",
        movieDescription: movie.movieDescription || "",
        movieAge: movie.movieAge || 0,
        movieThumbnail: null, // We don't set the file here
        movieTrailer: movie.movieTrailer || "",
        movieRating: movie.movieRating || 0,
        movieDuration: movie.movieDuration || 0,
        movieLanguage: movie.movieLanguage || "",
        movieCountry: movie.movieCountry || "",
        movieReleaseDate: movie.movieReleaseDate
          ? movie.movieReleaseDate.split("T")[0]
          : "",
        movieDirector: movie.movieDirector || "",
        movieProducer: movie.movieProducer || "",
        actors: movie.actors || [],
        genres: movie.genres || [],
      });
      setThumbnailPreview(movie.movieThumbnail || null);
    } else {
      resetForm();
    }
  }, [movie]);

  const resetForm = () => {
    setFormData(initialFormData);
    setThumbnailPreview(null);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, movieThumbnail: file }));
      setThumbnailPreview(URL.createObjectURL(file));

      // Clear error when field is edited
      if (errors.movieThumbnail) {
        setErrors((prev) => ({ ...prev, movieThumbnail: undefined }));
      }
    }
  };

  const handleAddActor = () => {
    if (actorInput.trim()) {
      const newActor = { actorName: actorInput.trim() };
      setFormData((prev) => ({
        ...prev,
        actors: [...prev.actors, newActor],
      }));
      setActorInput("");

      // Clear error when actors are added
      if (errors.actors) {
        setErrors((prev) => ({ ...prev, actors: undefined }));
      }
    }
  };

  const handleRemoveActor = (index) => {
    setFormData((prev) => ({
      ...prev,
      actors: prev.actors.filter((_, i) => i !== index),
    }));
  };

  const handleAddGenre = () => {
    if (genreInput.trim()) {
      const newGenre = { genreName: genreInput.trim() };
      setFormData((prev) => ({
        ...prev,
        genres: [...prev.genres, newGenre],
      }));
      setGenreInput("");

      // Clear error when genres are added
      if (errors.genres) {
        setErrors((prev) => ({ ...prev, genres: undefined }));
      }
    }
  };

  const handleRemoveGenre = (index) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.filter((_, i) => i !== index),
    }));
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

    if (formData.movieRating < 0 || formData.movieRating > 10) {
      newErrors.movieRating = "Rating must be between 0 and 10";
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

    if (formData.actors.length === 0 && movie) {
      newErrors.actors = "At least one actor is required";
    }

    if (formData.genres.length === 0) {
      newErrors.genres = "At least one genre is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("formData", formData);
      // Create FormData object for multipart/form-data submission
      const submitData = new FormData();

      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "movieThumbnail" && value) {
          submitData.append(key, value);
        } else if (key === "actors" || key === "genres") {
          // Convert arrays to JSON strings
          submitData.append(key, JSON.stringify(value));
        } else if (key !== "movieThumbnail") {
          submitData.append(key, String(value));
        }
      });

      if (movie) {
        // Update existing movie
        const response = "";
      } else {
        // Create new movie

        const response = await axiosClient.post(createMovie, submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 200) {
          console.log("Movie created successfully:", response.data);
        }
        console.log("response", response);
      }

      onClose?.(true); // Close with refresh flag
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

  const clearThumbnail = () => {
    setThumbnailPreview(null);
    setFormData((prev) => ({
      ...prev,
      movieThumbnail: null,
    }));
  };

  return {
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
  };
}

import z from "zod";

const formAddMovie = z.object({
  movieName: z.string().min(1, "Movie name is required"),
  movieDescription: z.string().min(1, "Description is required"),
  movieAge: z
    .number({ invalid_type_error: "Age must be a number" })
    .min(0, "Age must be 0 or greater"),
  movieDuration: z
    .number({ invalid_type_error: "Duration must be a number" })
    .min(1, "Duration must be at least 1 minute"),
  movieTrailer: z.string().url("Invalid URL").optional().or(z.literal("")),
  movieRating: z
    .number({ invalid_type_error: "Rating must be a number" })
    .min(0, "Minimum rating is 0")
    .max(10, "Maximum rating is 10")
    .optional(),
  movieLanguage: z.string().min(1, "Language is required"),
  movieCountry: z.string().min(1, "Country is required"),
  movieReleaseDate: z.string().min(1, "Release date is required"), // Can be refined to date format
  movieDirector: z.string().min(1, "Director is required"),
  movieProducer: z.string().optional(),
  movieThumbnail: z.any().optional(), // You can refine this if needed (e.g. File instance check)
  actors: z.array(z.object({ actorName: z.string().min(1) })).optional(),
  genres: z
    .array(z.object({ genreName: z.string().min(1) }))
    .min(1, "At least one genre is required"),
});

export { formAddMovie };

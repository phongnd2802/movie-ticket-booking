import { MovieHeader } from "./movie-header";
import { MovieSynopsis } from "./movie-synopsis";
import { ShowtimesSection } from "./showtimes-section";

export function MovieContent({
  movie,
  actors,
  openCastModal,
  activeDate,
  setActiveDate,
  dates,
}) {
  if (!movie) {
    return <div className="p-4">Loading movie content...</div>;
  }

  return (
    <div>
      <MovieHeader
        movie={movie}
        actors={actors || []}
        openCastModal={openCastModal}
      />
      <MovieSynopsis description={movie.movieDescription} releaseInfo={movie} />
      <ShowtimesSection
        shows={movie.shows || []}
        activeDate={activeDate}
        setActiveDate={setActiveDate}
        dates={dates || []}
      />
    </div>
  );
}

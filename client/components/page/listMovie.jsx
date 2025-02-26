import Movie from "./movie";
function ListMovie({ movies }) {
  return (
    <div className="flex flex-row justify-center gap-3 flex-wrap">
      {movies.map((item, index) => (
        <div>
          <Movie width={item.width} height={item.height} trailer />
        </div>
      ))}
    </div>
  );
}

export default ListMovie;

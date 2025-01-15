import Image from "next/image";

function Movie({ width, height, title }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative group w-fit">
        <Image
          src="/image/movie-poster.jpg"
          width={width}
          height={height}
          className="transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <button className="w-[120px] h-[40px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] inset-0 flex items-center justify-center text-white font-semibold bg-orange-500 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Mua vé
        </button>
      </div>
      <span className="font-semibold font-sans hover:cursor-pointer">
        {title}
      </span>
    </div>
  );
}

export default Movie;

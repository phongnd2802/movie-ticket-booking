// import Image from "@/components/page/imagekit";
import Link from "next/link";
import { TicketCheck, CirclePlay } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { VideoModal } from "../movie/video-modal";
import { useState } from "react";
import MyImage from "@/components/page/imagekit";
export default function Movie({
  width,
  height,
  image = "page/nha-gia-tien-500_1739775156127.jpg",
  title = "Bụi đời chợ lớn",
  genre,
  trailer = false,
  ticket = true,
  className,
  styleText,
  id = 1,
}) {
  const router = useRouter();

  const [videoOpen, setVideoOpen] = useState(false);
  const handlerClickMovie = (movieId) => {
    router.push(`/booking/${movieId}`);
  };
  return (
    <div
      className={cn(
        "p-2 gap-2 hover:cursor-pointer",
        !className && "flex flex-col",
        className
      )}
    >
      <div
        className="group relative rounded-md overflow-hidden"
        onClick={() => handlerClickMovie(id)}
      >
        <MyImage
          path={image}
          alt={title}
          width={width}
          height={height}
          className="rounded-md transition-transform duration-300 group-hover:scale-105 w-full h-auto object-cover"
        />

        {(trailer || ticket) && (
          <div
            className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center gap-4
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full h-auto object-cover"
          >
            {ticket && (
              <Link
                href={`booking/${id}`}
                className="text-white bg-[#f26b38] w-[120px] h-[40px] flex gap-2 items-center justify-center
                         rounded-md text-sm hover:bg-[#fb9440] transition-colors"
                aria-label={`Mua vé xem phim ${title}`}
              >
                <TicketCheck size={20} />
                <span>Mua vé</span>
              </Link>
            )}

            {trailer && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setVideoOpen(!videoOpen);
                }}
                className="border border-white text-white w-[120px] h-[40px] flex gap-2 items-center justify-center
                         rounded-md text-sm hover:bg-[#fb9440] hover:border-[#fb9440] transition-colors"
                aria-label={`Xem trailer phim ${title}`}
              >
                <CirclePlay size={20} />
                <span>Trailer</span>
              </div>
            )}
          </div>
        )}
      </div>

      <VideoModal
        open={videoOpen}
        onOpenChange={setVideoOpen}
        trailerUrl={trailer}
      />

      <Link href={`booking/${id}`} className="block">
        <h3
          className={cn(
            trailer && "font-bold",
            styleText,
            "line-clamp-2 hover:text-blue-700 transition-colors"
          )}
        >
          {title}
        </h3>
      </Link>

      {genre && <p className="text-gray-500 text-sm">{genre}</p>}
    </div>
  );
}

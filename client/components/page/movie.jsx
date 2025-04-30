import Image from "@/components/page/imagekit";
import Link from "next/link";
import { TicketCheck, CirclePlay } from "lucide-react";
import { cn } from "@/lib/utils";

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
  href = "/",
}) {
  return (
    <div
      className={cn(
        "p-2 gap-2 hover:cursor-pointer",
        !className && "flex flex-col",
        className
      )}
    >
      <div className="group relative rounded-md overflow-hidden">
        <Image
          path={image}
          alt={title}
          width={width}
          height={height}
          className="rounded-md transition-transform duration-300 group-hover:scale-105"
        />

        {(trailer || ticket) && (
          <div
            className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center gap-4
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            {ticket && (
              <Link
                href={`${href}/tickets`}
                className="text-white bg-[#f26b38] w-[120px] h-[40px] flex gap-2 items-center justify-center
                         rounded-md text-sm hover:bg-[#fb9440] transition-colors"
                aria-label={`Mua vé xem phim ${title}`}
              >
                <TicketCheck size={20} />
                <span>Mua vé</span>
              </Link>
            )}

            {trailer && (
              <Link
                href={`${href}/trailer`}
                className="border border-white text-white w-[120px] h-[40px] flex gap-2 items-center justify-center
                         rounded-md text-sm hover:bg-[#fb9440] hover:border-[#fb9440] transition-colors"
                aria-label={`Xem trailer phim ${title}`}
              >
                <CirclePlay size={20} />
                <span>Trailer</span>
              </Link>
            )}
          </div>
        )}
      </div>

      <Link href={href} className="block">
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

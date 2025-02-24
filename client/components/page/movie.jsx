import Image from "@/components/page/imagekit";
import Link from "next/link";
import { TicketCheck, CirclePlay } from "lucide-react";
import clsx from "clsx";

function Movie({ width, height, image, title, genre, trailer = false }) {
  return (
    <div className=" p-2 flex flex-col gap-2 hover:cursor-pointer">
      <div className="group relative rounded-[5px]">
        <Image
          path="page/nha-gia-tien-500_1739775156127.jpg"
          alt={"Bụi đời chợ lớn"}
          width={width}
          height={height}
          className="rounded-[5px]"
        />
        <div
          className={`absolute top-0 left-0 transition-opacity duration-500 
            group-hover:opacity-100 opacity-0 bg-backgroundHover 
            flex flex-col justify-center items-center gap-4`}
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <Link
            href={"/"}
            className="text-white bg-[#f26b38] w-[120px] h-[40px] text-center leading-[40px] rounded-[3px] 
            text-[14px] flex gap-2 items-center justify-center hover:bg-[#fb9440]"
          >
            <span>
              <TicketCheck size={20} />
            </span>
            <span>Mua vé</span>
          </Link>
          {trailer && (
            <Link
              href={"/"}
              className="border border-solid border-white text-white w-[120px] h-[40px] text-center 
              leading-[40px] rounded-[3px] text-[14px] flex gap-2 items-center justify-center hover:bg-[#fb9440] hover:border-[#fb9440]"
            >
              <span>
                <CirclePlay size={20} />
              </span>
              <span>Trailer</span>
            </Link>
          )}
        </div>
      </div>
      <span className={clsx(trailer && "font-bold")}>Bụi đời chợ lớn</span>
    </div>
  );
}

export default Movie;

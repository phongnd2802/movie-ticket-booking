import { Search } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

import { HoverCardDemo } from "../action/hover";
const data = [
  { href: "/news", text: "Diễn viên" },
  { href: "/login", text: "Đạo diễn" },
  { href: "/regiter", text: "Bình luận phim" },
  { href: "/regiter", text: "Bình luận phim" },
  { href: "/regiter", text: "Bình luận phim" },
];

function Header() {
  return (
    <header>
      <div className={clsx("w-full p-[12px] ")}>
        <div
          className={clsx(
            "w-[80%] m-auto grid grid-cols-[15%_15%_40%_30%] items-center gap-4"
          )}
        >
          <div>
            <Image
              src="/image/galaxy-logo.png"
              width={115}
              height={60}
              alt="Galaxy Cinema Logo"
            />
          </div>

          <div>
            <Image
              src="/image/buy-ticket.webp"
              width={115}
              height={60}
              alt="Galaxy Cinema Logo"
            />
          </div>

          <div className="flex justify-between">
            <HoverCardDemo title="Phim" items={data} />
            <HoverCardDemo title="Phim" items={data} />
            <HoverCardDemo title="Phim" items={data} />
            <HoverCardDemo title="Phim" items={data} />
          </div>

          <div className="flex gap-5 items-center text-sm text-[#777] justify-end">
            <div>
              <label>
                <Search />
              </label>
            </div>

            <div>
              <span>
                <Link href="/login" className="text-sm">
                  Đăng nhập
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

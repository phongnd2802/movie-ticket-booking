import Link from "next/link";
import Image from "./imagekit";
import { Search, AlignRight, UserRound } from "lucide-react";

import { navItems } from "@/lib/data";
import Navigation from "./navigation-menu";

function Header() {
  return (
    <header className="flex items-center justify-center p-6 ">
      <div className="flex items-center justify-between w-full max-w-[80%] max-sm:max-w-[100%] max-lg:max-w-[80%] max-md:max-w-[85%] max-ssm:max-w-[90%]">
        <div className="flex items-center gap-6 max-md:hidden">
          <div>
            <Image
              path="page/galaxy-logo.png"
              alt="logo"
              width={115}
              height={60}
            />
          </div>
          <div className="hidden max-lg:block">
            <Image
              path="page/buy-ticket.webp"
              alt="buy-tiket"
              width={112}
              height={36}
            />
          </div>
        </div>

        <div className="hidden max-md:flex items-center gap-6 ">
          <div>
            <Image
              path="page/galaxy-logo.png"
              alt="logo"
              width={76.6666666667}
              height={40}
            />
          </div>
          <div>
            <Image
              path="page/buy-ticket.webp"
              alt="buy-tiket"
              width={84}
              height={27}
            />
          </div>
        </div>

        <div className="max-lg:hidden flex gap-6 items-center text-[#4a4a4a]">
          <div className="max-sm:block">
            <Image
              path="page/buy-ticket.webp"
              alt="buy-tiket"
              width={112}
              height={36}
            />
          </div>
          <div className="flex justify-between gap-6">
            {navItems.map((item, index) => (
              <Navigation
                key={index}
                title={item.title}
                subItems={item.subItems}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-4 items-center h-auto text-[#777777] max-lg:hidden hover:cursor-pointer">
          <span>
            <Search size={16} />
          </span>
          <div className="hover:text-textOrange text-[14px]">
            <Link href="/login">Đăng nhập</Link>
          </div>
          <div>
            <Image
              path="page/join-member-Gstar.svg"
              alt="member"
              width={100}
              height={38.09}
            />
          </div>
        </div>

        <div className="hidden max-lg:flex gap-4 items-center h-auto text-[#777777] hover:cursor-pointer">
          <div className="flex items-center gap-2 text-[14px]">
            <span>
              <UserRound size={20} />
            </span>
            <div className="hover:text-textOrange">
              {" "}
              <Link href="/login">Đăng nhập</Link>
            </div>
          </div>
          <span>
            <AlignRight size={24} />
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;

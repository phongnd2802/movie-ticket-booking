import { Search } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

function Header() {
  return (
    <div className={clsx("w-full p-[12px] bg-white")}>
      <div className={clsx("w-[80%] m-auto flex justify-between items-center")}>
        <div>
          <Image src="/image/galaxy-logo.png" width={115} height={60} />
        </div>
        <div>
          <h2>adkjfhdjssdhf</h2>
        </div>
        <div className="flex gap-5 items-center text-sm text-[#777]">
          <div>
            <label>
              <Search />
            </label>
          </div>
          <div>
            <span>
              <Link href="/login" className="text-sm ">
                Đăng nhập
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

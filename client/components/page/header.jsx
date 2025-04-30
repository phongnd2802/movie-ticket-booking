"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  AlignRight,
  UserRound,
  LogOut,
  CircleUser,
} from "lucide-react";
import { navItems } from "@/lib/data";
import Navigation from "./navigation-menu";
import Image from "./imagekit";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      try {
        const parsedUser = JSON.parse(userFromStorage);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <header className="flex items-center justify-center p-6 ">
      <div className="flex items-center justify-between w-full max-w-[85%] max-sm:max-w-[100%] max-lg:max-w-[80%] max-md:max-w-[85%] max-ssm:max-w-[90%]">
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

        {/* Desktop auth section */}
        <div className="flex gap-4 items-center h-auto text-[#777777] max-lg:hidden hover:cursor-pointer">
          <span>
            <Search size={16} />
          </span>

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="text-[14px] font-medium text-textOrange">
                {user.avatar ? (
                  <Image
                    path={user.avatar}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  // <CircleUser size={24} className="rounded-full" />
                  // Tạm thời
                  <Image
                    path={"page/ts.jpg?height=24&width=24"}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
              </div>
              <span>{user.name || "Hoàng Thị Mỹ Linh"}</span>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Mobile auth section */}
        <div className="hidden max-lg:flex gap-4 items-center h-auto text-[#777777] hover:cursor-pointer">
          <div className="flex items-center gap-2 text-[14px]">
            <span>
              <UserRound size={20} />
            </span>
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <div className="text-textOrange">avatar</div>
                <button
                  onClick={handleLogout}
                  className="hover:text-textOrange flex items-center gap-1"
                >
                  <LogOut size={14} />
                  <span className="sr-only">Đăng xuất</span>
                </button>
              </div>
            ) : (
              <>
                <div className="hover:text-textOrange">
                  <Link href="/login">Đăng nhập</Link>
                </div>
                <span>
                  <AlignRight size={24} />
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

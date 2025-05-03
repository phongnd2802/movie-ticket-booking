"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, AlignRight, UserRound, LogOut } from "lucide-react";
import { navItems } from "@/lib/data";
import Navigation from "./navigation-menu";
import MyImage from "./imagekit";
import Image from "next/image";

export default function Header({ isLogin }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
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
              src="/image/galaxy-logo.png"
              alt="logo"
              width={115}
              height={60}
            />
          </div>
          <div className="hidden max-lg:block">
            <MyImage
              path="https://res.cloudinary.com/dwwrqkjnu/image/upload/v1746012682/z6557046734969_9c070767bf0df384017de26d80bf2c66_iyyjxc.jpg"
              alt="buy-tiket"
              width={112}
              height={36}
            />
          </div>
        </div>

        <div className="hidden max-md:flex items-center gap-6 ">
          <div>
            <MyImage
              path="https://res.cloudinary.com/dwwrqkjnu/image/upload/v1746012661/z6557046179185_1650de137afbe85aa833a46e4b030380_xdkexw.jpg"
              alt="logo"
              width={76.6666666667}
              height={40}
            />
          </div>
          <div>
            <MyImage
              path="https://res.cloudinary.com/dwwrqkjnu/image/upload/v1746012682/z6557046734969_9c070767bf0df384017de26d80bf2c66_iyyjxc.jpg"
              alt="buy-tiket"
              width={84}
              height={27}
            />
          </div>
        </div>

        <div className="max-lg:hidden flex gap-6 items-center text-[#4a4a4a]">
          <div className="max-sm:block">
            <MyImage
              path="https://res.cloudinary.com/dwwrqkjnu/image/upload/v1746012682/z6557046734969_9c070767bf0df384017de26d80bf2c66_iyyjxc.jpg"
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

          {isLogin ? (
            <div className="flex items-center gap-3">
              {/* <div className="text-[14px] font-medium text-textOrange">
                {user.avatar ? (
                 <MyImage
                    path={user.avatar}
                    alt="avatar"
                    width={40}
                    height={40
                    className="rounded-full"
                  />
                ) : (
                  // <CircleUser size={24} className="rounded-full" />
                  // Tạm thời
                 <MyImage
                    path={"page/ts.jpg?height=24&width=24"}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
              </div> */}
              <span>{user.name || "Hoàng Thị Mỹ Linh"}</span>
            </div>
          ) : (
            <>
              <div className="hover:text-textOrange text-[14px]">
                <Link href="/login">Đăng nhập</Link>
              </div>
              <div>
                <MyImage
                  path="https://res.cloudinary.com/dwwrqkjnu/image/upload/v1746012700/z6557047121506_b0f7903684913ad76f302783a53458d6_n1wb9m.jpg"
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
            {isLogin ? (
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

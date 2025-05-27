"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { navItems } from "@/lib/data";
import Navigation from "./navigation-menu";
import MyImage from "./imagekit";
import Image from "next/image";
import axiosClient from "@/lib/auth/axiosClient";
import { logout } from "@/endpoint/auth";
import { deleteCookie } from "@/lib/cookie";
import { useRouter } from "next/navigation";

export default function Header({
  isLogin: initialIsLogin = false,
  onChange,
  search,
  handleSearch,
  isSearchOpen,
  setIsSearchOpen,
}) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLogin);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Add search states

  const searchRef = useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log(userData);
    if (userData) {
      setUser(JSON.parse(userData));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axiosClient.post(logout);
      if (response.status === 200) {
        if (response.data.code === 20000) {
          localStorage.removeItem("user");
          setUser(null);
          setIsLoggedIn(false);
          deleteCookie("at");
          deleteCookie("rt");
          router.push("/");
        }
      } else {
        alert("Đăng xuất không thành công");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isUserMenuOpen &&
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setIsUserMenuOpen(false);
      }

      // Close search when clicking outside
      if (
        isSearchOpen &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
    };

    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isUserMenuOpen, isSearchOpen]);

  return (
    <header className="flex items-center justify-center p-6 relative">
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

        <div className="flex gap-4 items-center h-auto text-[#777777] max-lg:hidden hover:cursor-pointer">
          {/* Search icon and search box */}
          <div className="relative" ref={searchRef}>
            {isSearchOpen ? (
              <div className="absolute right-0 top-[-10px] flex items-center">
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    value={search}
                    onChange={onChange}
                    placeholder="Tìm kiếm..."
                    className="border border-gray-300 rounded-l-md py-1 px-3 focus:outline-none focus:ring-1 focus:ring-orange-400 w-[200px]"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 text-white p-1 rounded-r-md hover:bg-orange-600"
                  >
                    <Search size={16} />
                  </button>
                </form>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <span onClick={() => setIsSearchOpen(true)}>
                <Search
                  size={16}
                  className="hover:text-textOrange transition-colors"
                />
              </span>
            )}
          </div>

          {isLoggedIn ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-3 hover:text-textOrange"
              >
                <span>{user?.userName || "Hoàng Thị Mỹ Linh"}</span>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
                  <div className="px-4 py-3 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src="/image/volinh.jpg"
                          alt="User avatar"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {user?.name || "Hoàng Thị Mỹ Linh"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user?.userEmail || "user@example.com"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Thông tin tài khoản
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
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
      </div>

      {/* Mobile search bar - shown at the bottom of header when search is open on mobile */}
      {isSearchOpen && (
        <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-white p-2 shadow-md z-10">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Tìm kiếm..."
              className="border border-gray-300 rounded-l-md py-1 px-3 focus:outline-none focus:ring-1 focus:ring-orange-400 flex-1"
              autoFocus
            />
            <button
              type="submit"
              className="bg-orange-500 text-white p-1 rounded-r-md hover:bg-orange-600"
            >
              <Search size={16} />
            </button>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          </form>
        </div>
      )}
    </header>
  );
}

"use client";
import { getAllMovie } from "@/endpoint/auth";
import { getCookie } from "@/lib/cookie";
import { movieNotFound } from "@/ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export function useMovie() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const accessToken = getCookie("ac");
        const response = await axios.get(getAllMovie, {
          headers: {
            "Content-Type": "application/json",
            authorization: "bearer " + accessToken,
          },
        });
        if (response.status === 200) {
          setMovies(response.data);
        }
      } catch {
        toast.error("Không thể tải phim, vui lòng thử lại", movieNotFound);
      }
    };
    fetchMovies();
  }, []);
  return { movies };
}

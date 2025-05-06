"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchRelatedMovies } from "@/lib/api";

export default function MovieDetailRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Movie Listings</h2>
        <p className="mb-6">Please select a movie from our collection</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"></div>
      </div>
    </div>
  );
}

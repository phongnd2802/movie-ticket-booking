"use client";

import { useState } from "react";
import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TheaterCard } from "./theater-card";

export function ShowtimesSection({ shows, activeDate, setActiveDate, dates }) {
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [selectedCinema, setSelectedCinema] = useState("all");

  const noShows = !shows || shows.length === 0;

  // Get unique provinces from shows
  const provinces = useMemo(() => {
    if (noShows) return [];

    const uniqueProvinces = [
      ...new Set(shows.map((show) => show.cinemaHall.cinema.cinemaProvince)),
    ];

    return uniqueProvinces;
  }, [shows, noShows]);

  // Get unique cinemas from shows, filtered by selected province if applicable
  const cinemas = useMemo(() => {
    if (noShows) return [];

    let filteredShows = shows;
    if (selectedProvince !== "all") {
      filteredShows = shows.filter(
        (show) => show.cinemaHall.cinema.cinemaProvince === selectedProvince
      );
    }

    const uniqueCinemas = [
      ...new Set(
        filteredShows.map((show) => show.cinemaHall.cinema.cinemaName)
      ),
    ];

    return uniqueCinemas.map((name) => {
      const cinema = filteredShows.find(
        (show) => show.cinemaHall.cinema.cinemaName === name
      ).cinemaHall.cinema;
      return {
        id: cinema.cinemaId,
        name: cinema.cinemaName,
      };
    });
  }, [shows, selectedProvince, noShows]);

  // Filter shows by selected date, province, and cinema
  const filteredShows = useMemo(() => {
    if (noShows || !activeDate) return [];

    return shows.filter((show) => {
      const showDate = new Date(show.showStartTime).toISOString().split("T")[0];

      const dateMatches = showDate === activeDate;

      const provinceMatches =
        selectedProvince === "all" ||
        show.cinemaHall.cinema.cinemaProvince === selectedProvince;

      const cinemaMatches =
        selectedCinema === "all" ||
        show.cinemaHall.cinema.cinemaName === selectedCinema;

      return dateMatches && provinceMatches && cinemaMatches;
    });
  }, [shows, activeDate, selectedProvince, selectedCinema, noShows]);

  // Group shows by cinema
  const showsByTheater = useMemo(() => {
    if (!filteredShows || filteredShows.length === 0) return [];

    const theaters = {};

    filteredShows.forEach((show) => {
      const cinema = show.cinemaHall.cinema;
      const cinemaId = cinema.cinemaId;

      if (!theaters[cinemaId]) {
        theaters[cinemaId] = {
          id: cinemaId,
          name: cinema.cinemaName,
          address: `${cinema.cinemaStreet}, ${cinema.cinemaWard}, ${cinema.cinemaDistrict}, ${cinema.cinemaProvince}`,
          shows: [],
        };
      }

      theaters[cinemaId].shows.push({
        id: show.showId,
        startTime: new Date(show.showStartTime),
        endTime: new Date(show.showEndTime),
        hall: show.cinemaHall.cinemaHallName,
      });
    });

    return Object.values(theaters);
  }, [filteredShows]);

  if (noShows) {
    return (
      <div className="mt-12 border-t pt-8">
        <div className="flex items-center">
          <div className="h-6 w-1 bg-primary"></div>
          <h2 className="ml-2 text-xl font-bold tracking-tight">Lịch Chiếu</h2>
        </div>
        <div className="mt-6 text-center py-8 text-muted-foreground">
          Không có lịch chiếu nào cho phim này
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 border-t pt-8">
      <div className="flex items-center">
        <div className="h-6 w-1 bg-primary"></div>
        <h2 className="ml-2 text-xl font-bold tracking-tight">Lịch Chiếu</h2>
      </div>

      {/* Date Selection */}
      <div className="mt-6 relative">
        <div className="flex items-center">
          <button className="absolute left-0 z-10 p-2 bg-background shadow-md rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex overflow-x-auto scrollbar-hide space-x-2 px-8">
            {dates.map((item) => (
              <button
                key={item.date}
                onClick={() => setActiveDate(item.date)}
                className={`min-w-[100px] py-3 px-4 text-center rounded-md transition-colors ${
                  activeDate === item.date
                    ? "bg-primary text-primary-foreground font-medium"
                    : "hover:bg-muted"
                }`}
              >
                <div className="font-medium">{item.day}</div>
                <div
                  className={
                    activeDate === item.date
                      ? "text-primary-foreground"
                      : "text-muted-foreground"
                  }
                >
                  {item.formattedDate}
                </div>
              </button>
            ))}
          </div>

          <button className="absolute right-0 z-10 p-2 bg-background shadow-md rounded-full">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <Select value={selectedProvince} onValueChange={setSelectedProvince}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Chọn tỉnh/thành" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả tỉnh/thành</SelectItem>
            {provinces.map((province) => (
              <SelectItem key={province} value={province}>
                {province}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedCinema} onValueChange={setSelectedCinema}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Chọn rạp" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả rạp</SelectItem>
            {cinemas.map((cinema) => (
              <SelectItem key={cinema.id} value={cinema.name}>
                {cinema.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Theater Listings */}
      <div className="mt-6 space-y-4">
        {showsByTheater.length > 0 ? (
          showsByTheater.map((theater) => (
            <TheaterCard
              key={theater.id}
              name={theater.name}
              address={theater.address}
              shows={theater.shows}
            />
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Không có suất chiếu nào cho ngày đã chọn
          </div>
        )}
      </div>
    </div>
  );
}

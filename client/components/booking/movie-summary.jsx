"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function MovieSummary({ movieDetails, selectedSeats, totalPrice }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(amount)
      .replace(/\s/g, "")
      .replace("₫", " ₫");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ];
    const day = days[date.getDay()];

    return `${day}, ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
  };

  return (
    <div className="lg:w-[300px]">
      <div className="border rounded-lg overflow-hidden">
        <div className="relative aspect-video">
          <Image
            src="/placeholder.svg?height=200&width=300"
            alt={movieDetails.movieName}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex items-start gap-2">
            <h2 className="text-lg font-semibold">{movieDetails.movieName}</h2>
            <Badge variant="outline" className="bg-orange-500 text-white">
              {movieDetails.movieRating}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {movieDetails.movieFormat}
          </p>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Rạp:</span>
              <span className="text-sm font-medium">
                {movieDetails.cinemaName} - {movieDetails.cinemaHall}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Suất:</span>
              <span className="text-sm font-medium">
                {movieDetails.showTime} - {formatDate(movieDetails.showDate)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Ghế:</span>
              <span className="text-sm font-medium">
                {selectedSeats.length > 0
                  ? selectedSeats.map((seat) => seat.id).join(", ")
                  : "Chưa chọn"}
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="font-medium">Tổng cộng</span>
              <span className="font-bold text-lg text-primary">
                {formatCurrency(totalPrice)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

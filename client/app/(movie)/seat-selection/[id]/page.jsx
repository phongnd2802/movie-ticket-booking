"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/page/header";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { fetchShowDetails } from "@/lib/api";

export default function SeatSelectionPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [showDetails, setShowDetails] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch show details
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchShowDetails(id);
        console.log(data);
        setShowDetails(data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading show details:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (id) {
      loadData();
    }
  }, [id]);

  const handleSeatClick = (row, col) => {
    const seatId = `${row}${col}`;
    const isSeatSelected = selectedSeats.some((seat) => seat.id === seatId);

    if (isSeatSelected) {
      setSelectedSeats(selectedSeats.filter((seat) => seat.id !== seatId));
    } else {
      setSelectedSeats([
        ...selectedSeats,
        { id: seatId, row, col, price: 90000 },
      ]);
    }
  };

  const isSeatSelected = (row, col) => {
    return selectedSeats.some((seat) => seat.id === `${row}${col}`);
  };

  const isSeatUnavailable = (row, col) => {
    // Simulate some unavailable seats
    const unavailableSeats = [
      "K13",
      "K14",
      "J13",
      "J14",
      "I13",
      "I14",
      "I15",
      "H7",
      "H8",
      "H9",
      "H10",
      "H11",
      "H12",
      "H13",
      "H14",
      "H15",
      "G11",
      "G12",
      "G13",
      "G14",
      "G15",
      "F13",
      "F14",
    ];
    return unavailableSeats.includes(`${row}${col}`);
  };

  const isSeatVIP = (row, col) => {
    // VIP seats are typically in the middle rows
    return ["F", "G", "H", "I", "J"].includes(row) && col >= 7 && col <= 18;
  };

  const isSeatCouple = (row, col) => {
    // Couple seats are typically at the back
    return ["O", "P"].includes(row) && col % 2 === 0;
  };

  const getTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  };

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

  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Đang tải thông tin...</h2>
          <div className="animate-pulse h-2 w-48 bg-gray-300 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Lỗi</h2>
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => router.push("/booking")}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
          >
            Quay lại danh sách phim
          </button>
        </div>
      </div>
    );
  }

  // Mock data for demonstration
  const movieDetails = showDetails || {
    movieName: "Địa Đạo: Mặt Trời Trong Bóng Tối",
    movieFormat: "2D Phụ Đề",
    movieRating: "T16",
    showTime: "10:15",
    showDate: "2025-04-12",
    cinemaName: "Galaxy Nguyễn Du",
    cinemaHall: "RẠP 2",
  };

  // Generate rows A-P
  const rows = "ABCDEFGHIJKLMNOP".split("");

  // Generate columns 1-25
  const columns = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Progress Steps */}
      <div className="border-b">
        <div className="container px-4">
          <div className="flex overflow-x-auto">
            <div className="min-w-[150px] py-3 text-center border-b-2 border-primary text-primary font-medium">
              Chọn phim / Rạp / Suất
            </div>
            <div className="min-w-[100px] py-3 text-center border-b-2 border-primary text-primary font-medium">
              Chọn ghế
            </div>
            <div className="min-w-[100px] py-3 text-center border-b-2 border-gray-200 text-muted-foreground">
              Chọn thức ăn
            </div>
            <div className="min-w-[100px] py-3 text-center border-b-2 border-gray-200 text-muted-foreground">
              Thanh toán
            </div>
            <div className="min-w-[100px] py-3 text-center border-b-2 border-gray-200 text-muted-foreground">
              Xác nhận
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Seat Selection */}
          <div className="flex-1">
            {/* Showtimes */}
            <div className="mb-6 flex items-center justify-between">
              <div className="font-medium">Đổi suất chiếu</div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {[
                  "10:15",
                  "11:45",
                  "12:30",
                  "13:30",
                  "15:00",
                  "16:30",
                  "17:30",
                  "20:00",
                  "21:00",
                  "22:30",
                ].map((time) => (
                  <button
                    key={time}
                    className={`px-4 py-2 text-sm rounded-md min-w-[60px] ${
                      time === movieDetails.showTime
                        ? "bg-primary text-white"
                        : "border hover:bg-gray-100"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Seat Map */}
            <div className="overflow-x-auto pb-8">
              <div className="min-w-[900px]">
                {/* Screen */}
                <div className="relative mb-16">
                  <div className="h-8 bg-gray-200 rounded-t-3xl mx-auto w-3/4"></div>
                  <div className="absolute -bottom-8 left-0 right-0 text-center text-sm text-gray-400">
                    Màn hình
                  </div>
                </div>

                {/* Seat Grid */}
                <div className="grid grid-cols-[auto_repeat(25,minmax(24px,1fr))_auto] gap-1">
                  {/* Row Headers */}
                  <div className="font-medium text-center">P</div>
                  {columns.map((col) => (
                    <div
                      key={`header-${col}`}
                      className="text-[10px] text-center"
                    >
                      {col}
                    </div>
                  ))}
                  <div className="font-medium text-center">P</div>

                  {/* Seats */}
                  {rows.map((row) => (
                    <>
                      <div
                        key={`row-${row}`}
                        className="font-medium text-center self-center"
                      >
                        {row}
                      </div>
                      {columns.map((col) => {
                        const unavailable = isSeatUnavailable(row, col);
                        const selected = isSeatSelected(row, col);
                        const vip = isSeatVIP(row, col);
                        const couple = isSeatCouple(row, col);

                        return (
                          <button
                            key={`seat-${row}${col}`}
                            disabled={unavailable}
                            onClick={() => handleSeatClick(row, col)}
                            className={`
                              w-6 h-6 flex items-center justify-center text-[10px] rounded-sm
                              ${
                                unavailable
                                  ? "bg-red-500 text-white cursor-not-allowed"
                                  : selected
                                  ? "bg-orange-500 text-white"
                                  : vip
                                  ? "bg-blue-100 border border-blue-300 hover:bg-blue-200"
                                  : couple
                                  ? "bg-pink-100 border border-pink-300 hover:bg-pink-200"
                                  : "bg-white border border-gray-300 hover:bg-gray-100"
                              }
                            `}
                          >
                            {unavailable ? "X" : ""}
                          </button>
                        );
                      })}
                      <div
                        key={`row-end-${row}`}
                        className="font-medium text-center self-center"
                      >
                        {row}
                      </div>
                    </>
                  ))}
                </div>

                {/* Legend */}
                <div className="mt-8 flex flex-wrap justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
                    <span className="text-sm">Ghế đã bán</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded-sm"></div>
                    <span className="text-sm">Ghế đang chọn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-blue-300 bg-blue-100 rounded-sm"></div>
                    <span className="text-sm">Ghế VIP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-gray-300 bg-white rounded-sm"></div>
                    <span className="text-sm">Ghế đôi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-gray-300 bg-white rounded-sm"></div>
                    <span className="text-sm">Ghế thường</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Movie Info */}
          <div className="lg:w-[300px]">
            <div className="border rounded-lg overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src="/emiu.jpg?height=200&width=300"
                  alt={movieDetails.movieName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start gap-2">
                  <h2 className="text-lg font-semibold">
                    {movieDetails.movieName}
                  </h2>
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
                      {movieDetails.showTime} -{" "}
                      {formatDate(movieDetails.showDate)}
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
                      {formatCurrency(getTotalPrice())}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-white p-4">
        <div className="container flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => router.push(`/booking/${movieDetails.movieId}`)}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
          <Button
            disabled={selectedSeats.length === 0}
            onClick={() =>
              router.push(
                `/food-selection/${id}?seats=${selectedSeats
                  .map((s) => s.id)
                  .join(",")}`
              )
            }
          >
            Tiếp tục
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

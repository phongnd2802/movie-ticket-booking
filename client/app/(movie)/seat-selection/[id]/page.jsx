"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/page/header";

import { getSeats } from "@/endpoint/auth";
import axiosClient from "@/lib/auth/axiosClient";
import MyImage from "@/components/page/imagekit";
import { useSeat } from "@/contexts/booking-context";
export default function SeatSelectionPage({ params }) {
  const { setInforBooking } = useSeat();
  const router = useRouter();
  const { id } = params;
  const [showDetails, setShowDetails] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ortherShows, setOrtherShows] = useState([]);
  const [showTime, setShowTime] = useState(null);
  const [cinemaHall, setCinemaHall] = useState(null);
  const [seatUnavailable, setSeatUnavailable] = useState([]);
  const [seatCouple, setSeatCouple] = useState([]);

  const handleSubmit = () => {
    const inf = {
      seatIds: selectedSeats.map((seat) => seat.id),
      cinemaHall: cinemaHall,
      showId: showTime,
      movieName: showDetails.movieName,
      totalPrice: getTotalPrice(),
    };
    setInforBooking(inf);
    router.push("/food-selection/1");
  };

  // Fetch show details
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const fetchShowDetails = async () => {
          const response = await axiosClient.get(getSeats(id));
          if (!response.status === 200) {
            throw new Error("Failed to fetch show details");
          } else {
            if (response.data.code !== 20000) {
              console.log("Error:", response.data.message);
            }
          }

          return await response.data;
        };
        const data = await fetchShowDetails();
        setShowDetails(data.metadata.movie);
        setOrtherShows(data.metadata.otherShows);
        setShowTime(data.metadata.showStartTime);
        setCinemaHall(data.metadata.cinemaHallName);
        data.metadata.seats.map((seat) => {
          if (seat.staseatStatetus === "UNAVAILABLE") {
            setSeatUnavailable((prev) => [...prev, seat]);
          } else if (seat.cinemaHallSeat.seatType === "COUPLE") {
            setSeatCouple((prev) => [...prev, seat]);
          }
        });
        setLoading(false);
      } catch (err) {
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
      const price = row === "P" ? 180000 : 90000;
      setSelectedSeats([...selectedSeats, { id: seatId, row, col, price }]);
    }
  };

  const isSeatSelected = (row, col) => {
    return selectedSeats.some((seat) => seat.id === `${row}${col}`);
  };

  const isSeatUnavailable = (row, col) => {
    return seatUnavailable.includes(`${row}${col}`);
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

  const handleShowTimeClick = (showStartTime) => {
    const showStartTimeDate =
      showStartTime.split("T")[0] +
      "T" +
      showStartTime.split("T")[1].slice(0, -3);
    setShowTime(showStartTimeDate);
  };

  // loading
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

  // error
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

  // Generate rows A-P
  const rows = "ABCDEFGHIJKLMNO".split("");

  const columns = Array.from({ length: 16 }, (_, i) => i + 1);

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
            <div className="mb-6 flex items-center gap-4">
              <div className="font-medium">Đổi suất chiếu</div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {ortherShows &&
                  ortherShows.map((showStartTime) => (
                    <button
                      key={showStartTime.showId}
                      className={`px-4 py-2 text-sm rounded-md min-w-[60px] ${
                        showStartTime === showDetails.showTime
                          ? "bg-primary text-white"
                          : "border hover:bg-gray-100"
                      }`}
                      onClick={() =>
                        handleShowTimeClick(showStartTime.showStartTime)
                      }
                    >
                      {showStartTime.showStartTime.split("T")[1].slice(0, -3)}
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
                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-[auto_repeat(16,minmax(24px,1fr))_auto] gap-[2px]">
                    {/* Row Headers */}
                    <div className="font-medium text-center"></div>
                    {columns.map((col) => (
                      <div
                        key={`header-${col}`}
                        className="text-[10px] text-center"
                      >
                        {col}
                      </div>
                    ))}
                    <div className="font-medium text-center"></div>

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
                          const couple = isSeatCouple(row, col);

                          return (
                            <button
                              key={`seat-${row}${col}`}
                              disabled={unavailable}
                              onClick={() => handleSeatClick(row, col)}
                              className={`
                              w-6 h-6 flex items-center justify-center text-[10px] rounded-sm m-auto
                              ${
                                unavailable
                                  ? "bg-red-500 text-white cursor-not-allowed"
                                  : selected
                                  ? "bg-orange-500 text-white"
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

                  <div className="grid grid-cols-[auto_repeat(8,minmax(48px,1fr))_auto] gap-[2px]">
                    <div className="font-medium text-center">P</div>
                    {columns.slice(0, columns.length / 2).map((col) => {
                      const row = "P";
                      const unavailable = isSeatUnavailable(row, col);
                      const selected = isSeatSelected(row, col);

                      return (
                        <button
                          key={`seat-${row}${col}`}
                          disabled={unavailable}
                          onClick={() => handleSeatClick(row, col)}
                          className={`
                              w-12 h-6 flex items-center justify-center text-[10px] rounded-sm m-auto
                              ${
                                unavailable
                                  ? "bg-red-500 text-white cursor-not-allowed"
                                  : selected
                                  ? "bg-orange-500 text-white"
                                  : "bg-white border border-gray-300 hover:bg-gray-100"
                              }
                            `}
                        >
                          {unavailable ? "X" : ""}
                        </button>
                      );
                    })}
                    <div className="font-medium text-center">P</div>
                  </div>
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
                <MyImage
                  path={showDetails.movieThumbnail}
                  alt={showDetails.movieName}
                  width={134}
                  height={200}
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start gap-2">
                  <h2 className="text-lg font-semibold">
                    {showDetails.movieName}
                  </h2>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Rạp:</span>
                    <span className="text-sm font-medium">{cinemaHall}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Suất:</span>
                    <span className="text-sm font-medium">
                      {showTime.split("T")[1]} -{" "}
                      {formatDate(showTime.split("T")[0])}
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
            onClick={() => router.push(`/booking/${showDetails.movieId}`)}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
          <Button
            disabled={selectedSeats.length === 0}
            onClick={() => handleSubmit()}
          >
            Tiếp tục
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

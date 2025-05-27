"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/page/header";
import MyImage from "@/components/page/imagekit";
import { useSeat } from "@/contexts/booking-context";
import { toast } from "sonner";
import axios from "axios";
import { booking, getSeats, paymentBooking } from "@/endpoint/auth";
import axiosClient from "@/lib/auth/axiosClient";

export default function SeatSelectionPage({ params }) {
  const { setInforBooking } = useSeat();
  const router = useRouter();
  const { id } = params;
  const [showDetails, setShowDetails] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [otherShows, setOtherShows] = useState([]);
  const [showTime, setShowTime] = useState(null);
  const [cinemaHall, setCinemaHall] = useState(null);
  const [seats, setSeats] = useState([]);
  const [showId, setShowId] = useState(null);

  // Fetch seat data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const fetchSeatDetails = async () => {
          try {
            // In a real application, this would be an API call to your backend
            const response = await axiosClient.get(getSeats(id));
            return response.data;
          } catch (error) {
            console.error("Error fetching seat data:", error);
            throw new Error("Failed to fetch seat details");
          }
        };

        const seatData = await fetchSeatDetails();

        if (seatData.code === 20000) {
          setSeats(seatData.metadata.seats);
          setCinemaHall(seatData.metadata.cinemaHallName);
          setShowDetails(seatData.metadata.movie);
          setOtherShows(seatData.metadata.otherShows);
          setShowTime(seatData.metadata.showStartTime);
          setShowId(seatData.metadata.showId);
        } else {
          toast.info(
            "Suất chiếu đã chiếu hoặc đang chiếu, vui lòng chọn suất chiếu khác.",
            {
              description: "Vui lòng chọn suất chiếu khác.",
            }
          );
          router.push("/");
          return;
        }

        setLoading(false);
      } catch (err) {
        console.error("Error:", err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
  }, [id, router]);

  const handleSeatClick = (seat) => {
    if (!seat || seat.seatState === "UNAVAILABLE") return;
    console.log(seat);
    const seatName = seat.cinemaHallSeat.seatName;
    const isSeatSelected = selectedSeats.some((s) => s.id === seatName);

    if (isSeatSelected) {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seatName));
    } else {
      // Determine price based on seat type
      const price = seat.showSeatPrice;

      setSelectedSeats([
        ...selectedSeats,
        {
          id: seatName,
          price,
          showSeatId: seat.showSeatId,
          type: seat.cinemaHallSeat.seatType,
        },
      ]);
    }
  };

  const isSeatSelected = (seatName) => {
    return selectedSeats.some((seat) => seat.id === seatName);
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

  const handleShowTimeClick = async (showStartTime, showId) => {
    try {
      setLoading(true);
      const showStartTimeDate =
        showStartTime.split("T")[0] +
        "T" +
        showStartTime.split("T")[1].slice(0, -3);
      setShowTime(showStartTimeDate);
      setShowId(showId);

      // Fetch seat information for the selected show
      const fetchSeatDetails = async (showId) => {
        try {
          const response = await axios.get(getSeats(showId));
          return response.data;
        } catch (error) {
          console.error("Error fetching seat data:", error);
          throw new Error("Failed to fetch seat details");
        }
      };

      const seatData = await fetchSeatDetails(showId);

      if (seatData.code === 20000) {
        setSeats(seatData.metadata.seats);
        setOtherShows(seatData.metadata.otherShows);
        setSelectedSeats([]);
      } else {
        toast.error("Không thể tải thông tin ghế ngồi");
      }

      setLoading(false);
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (selectedSeats.length === 0) {
      toast.error("Vui lòng chọn ít nhất một ghế");
      return;
    }

    try {
      // Gửi yêu cầu đặt ghế
      const bookingResponse = await axiosClient.post(
        booking,
        {
          seats: selectedSeats.map((seat) => seat.showSeatId),
          showId: showId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { status, data } = bookingResponse;
      console.log(bookingResponse);

      if (status !== 200 || data.code !== 20000) {
        toast.error(`Lỗi đặt vé: ${data.message || "Không thể đặt ghế"}`);
        return;
      }

      const bookingId = data.metadata?.bookingId + "";

      if (!bookingId) {
        toast.error("Không nhận được bookingId từ server.");
        return;
      }
      setInforBooking({
        seatIds: selectedSeats,
        cinemaHall,
        showId: showTime,
        movieName: showDetails.movieName,
        movieImage: showDetails.movieThumbnail,
        cartfood: [],
        totalPrice: getTotalPrice(),
        bookingId: bookingId,
      });

      // Gửi yêu cầu thanh toán
      router.push(`/food-selection/${id}`);
    } catch (error) {
      console.error("Lỗi khi đặt ghế hoặc thanh toán:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  // Loading state
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

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Lỗi</h2>
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  // Find all regular seats (rows A-N)
  const regularSeats = seats.filter(
    (seat) =>
      !seat.cinemaHallSeat.seatName.startsWith("O") ||
      seat.cinemaHallSeat.seatType !== "COUPLE"
  );

  // Find all couple seats in row O
  const coupleSeats = seats.filter(
    (seat) =>
      seat.cinemaHallSeat.seatName.startsWith("O") &&
      seat.cinemaHallSeat.seatType === "COUPLE"
  );

  // Organize regular seats by row and column for display
  const seatsByRow = {};
  regularSeats.forEach((seat) => {
    const seatName = seat.cinemaHallSeat.seatName;
    // Extract row letter (could be one or more characters)
    const rowMatch = seatName.match(/^([A-Z]+)/i);
    if (rowMatch) {
      const row = rowMatch[1];
      if (!seatsByRow[row]) {
        seatsByRow[row] = [];
      }
      seatsByRow[row].push(seat);
    }
  });

  // Sort rows alphabetically
  const sortedRows = Object.keys(seatsByRow).sort();

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
                {otherShows && otherShows.length > 0 ? (
                  otherShows.map((show) => (
                    <button
                      key={show.showId}
                      className={`px-4 py-2 text-sm rounded-md min-w-[60px] ${
                        show.showId === showId
                          ? "bg-primary text-white"
                          : "border hover:bg-gray-100"
                      }`}
                      onClick={() =>
                        handleShowTimeClick(show.showStartTime, show.showId)
                      }
                    >
                      {show.showStartTime.split("T")[1].slice(0, -3)}
                    </button>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Không có suất chiếu khác
                  </span>
                )}
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
                  {/* Regular Seats (Rows A-N) */}
                  {sortedRows.map((row) => {
                    // Sort seats by column number
                    const rowSeats = seatsByRow[row].sort((a, b) => {
                      const aNum = Number.parseInt(
                        a.cinemaHallSeat.seatName.replace(/^[A-Z]+/i, "")
                      );
                      const bNum = Number.parseInt(
                        b.cinemaHallSeat.seatName.replace(/^[A-Z]+/i, "")
                      );
                      return aNum - bNum;
                    });

                    return (
                      <div key={row} className="flex items-center">
                        <div className="w-8 font-medium text-center">{row}</div>
                        <div className="flex flex-1 gap-1 justify-center">
                          {rowSeats.map((seat) => {
                            const seatName = seat.cinemaHallSeat.seatName;
                            const isUnavailable = seat.seatState === "HELD";
                            const isSelected = isSeatSelected(seatName);
                            const isCouple =
                              seat.cinemaHallSeat.seatType === "COUPLE";

                            return (
                              <button
                                key={seat.showSeatId}
                                disabled={isUnavailable}
                                onClick={() => handleSeatClick(seat)}
                                className={`
                                  ${isCouple ? "w-12" : "w-6"} 
                                  h-6 flex items-center justify-center text-[10px] rounded-sm
                                  ${
                                    isUnavailable
                                      ? "bg-red-500 text-white cursor-not-allowed"
                                      : isSelected
                                      ? "bg-orange-500 text-white"
                                      : isCouple
                                      ? "bg-white border-2 border-pink-300 hover:bg-gray-100"
                                      : "bg-white border border-gray-300 hover:bg-gray-100"
                                  }
                                `}
                              >
                                {isUnavailable ? "X" : ""}
                              </button>
                            );
                          })}
                        </div>
                        <div className="w-8 font-medium text-center">{row}</div>
                      </div>
                    );
                  })}

                  {/* Last Row with Couple Seats (Row O) */}
                  <div className="flex items-center mt-4">
                    <div className="w-8 font-medium text-center">O</div>
                    <div className="flex flex-1 gap-2 justify-center">
                      {coupleSeats.map((seat) => {
                        const seatName = seat.cinemaHallSeat.seatName;
                        const isUnavailable = seat.seatState === "HELD";
                        const isSelected = isSeatSelected(seatName);

                        return (
                          <button
                            key={seat.showSeatId}
                            disabled={isUnavailable}
                            onClick={() => handleSeatClick(seat)}
                            className={`
                              w-12 h-6 flex items-center justify-center text-[10px] rounded-sm
                              ${
                                isUnavailable
                                  ? "bg-red-500 text-white cursor-not-allowed"
                                  : isSelected
                                  ? "bg-orange-500 text-white"
                                  : "bg-white border-2 border-pink-300 hover:bg-gray-100"
                              }
                            `}
                          >
                            {isUnavailable ? "X" : seatName}
                          </button>
                        );
                      })}
                    </div>
                    <div className="w-8 font-medium text-center">O</div>
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
                    <div className="w-4 h-4 border-2 border-pink-300 bg-white rounded-sm"></div>
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
                  path={showDetails?.movieThumbnail || ""}
                  alt={showDetails?.movieName || "Movie poster"}
                  width={134}
                  height={200}
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start gap-2">
                  <h2 className="text-lg font-semibold">
                    {showDetails?.movieName || "Movie Title"}
                  </h2>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Rạp:</span>
                    <span className="text-sm font-medium">
                      {cinemaHall || "Cinema Hall"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Suất:</span>
                    <span className="text-sm font-medium">
                      {showTime
                        ? `${showTime.split("T")[1]} - ${formatDate(
                            showTime.split("T")[0]
                          )} `
                        : "Show Time"}
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
            onClick={() =>
              router.push(`/booking/${showDetails?.movieId || id}`)
            }
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
          <Button disabled={selectedSeats.length === 0} onClick={handleSubmit}>
            Tiếp tục
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

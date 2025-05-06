"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Plus, Minus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSeat } from "@/contexts/booking-context";
import axios from "axios";
import { getAllFood } from "@/endpoint/auth";
import { getRefreshToken } from "@/lib/auth/token";

export default function FoodSelectionPage({ params }) {
  const { inforBooking, setInforBooking } = useSeat();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = params;
  const selectedSeats = searchParams.get("seats")?.split(",") || [];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [food, setFood] = useState([]);
  const [readyToRedirect, setReadyToRedirect] = useState(false);
  useEffect(() => {
    if (
      !inforBooking.seatIds ||
      !inforBooking.cinemaHall ||
      !inforBooking.showId
    ) {
      setError("Vui lòng chọn ghế trước khi tiếp tục.");
      router.push(`/seat-selection/${id}`);
    }
    setLoading(false);
  }, [selectedSeats, id]);
  useEffect(() => {
    const userCurrent = localStorage.getItem("user");
    if (userCurrent) {
      setUser(JSON.parse(userCurrent));
    }
  }, []);
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const { at, rt } = await getRefreshToken();
        const response = await axios.get(getAllFood, {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        });
        if (response.status === 200) {
          setFood(response.data.metadata);
        } else {
          console.error("Error fetching food:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching food:", error);
      }
    };
    fetchFood();
  }, []);

  const addToCart = (item) => {
    const existingItem = cart.find(
      (cartItem) => cartItem.foodId === item.foodId
    );

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.foodId === item.foodId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existingItem = cart.find((item) => item.foodId === itemId);

    if (existingItem.quantity === 1) {
      setCart(cart.filter((item) => item.foodId !== itemId));
    } else {
      setCart(
        cart.map((item) =>
          item.foodId === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const getItemQuantity = (itemId) => {
    const item = cart.find((item) => item.foodId === itemId);
    return item ? item.quantity : 0;
  };

  const getTotalPrice = () => {
    const foodTotal = cart.reduce(
      (total, item) => total + item.foodPrice * item.quantity,
      0
    );
    const ticketPrice = inforBooking
      ? inforBooking.totalPrice + foodTotal
      : inforBooking.totalPrice;
    return ticketPrice;
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

  const handleSubmit = () => {
    const price = getTotalPrice();
    setInforBooking((prev) => ({
      ...prev,
      totalPrice: price,
      cartfood: cart,
    }));
    setReadyToRedirect(true);
  };

  useEffect(() => {
    if (readyToRedirect) {
      router.push("/payment");
    }
  }, [inforBooking]);

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

  // Get movie poster URL from inforBooking or use a default
  const moviePosterUrl = inforBooking.movieImage;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="border-b">
        <div className="container px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/doan.jpg?height=40&width=120"
              alt="Galaxy Cinema"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-right">
              <div className="font-medium">{user.userName}</div>
              <div className="text-muted-foreground">0 Stars</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium">LS</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="border-b">
        <div className="container px-4">
          <div className="flex overflow-x-auto">
            <div className="min-w-[150px] py-3 text-center border-b-2 border-primary text-primary font-medium">
              Chọn phim / Rạp / Suất
            </div>
            <div className="min-w-[totalPrice100px] py-3 text-center border-b-2 border-primary text-primary font-medium">
              Chọn ghế
            </div>
            <div className="min-w-[100px] py-3 text-center border-b-2 border-primary text-primary font-medium">
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
          {/* Food Selection */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6">Thức ăn & Đồ uống</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {food && food.length > 0 ? (
                food.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={item.image || "/doan.jpg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{item.foodName}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.foodDescription}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-bold">
                          {inforBooking.foodPrice} VND
                        </span>

                        {getItemQuantity(item.id) > 0 ? (
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => removeFromCart(item.foodId)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-medium">
                              {getItemQuantity(item.foodId)}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => addToCart(item)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            onClick={() => addToCart(item)}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Thêm
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center col-span-3">đéo có đồ ăn</div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-[300px]">
            <div className="border rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex justify-between items-center mb-4 w-full">
                    <span className="text-sm text-gray-600">
                      Thời gian giữ ghế:
                    </span>
                    <div className="flex items-center text-orange-500 font-medium">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>06:30</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {/* Movie poster */}
                  <div className="relative w-full h-[180px] rounded-md overflow-hidden mb-3">
                    <Image
                      src={moviePosterUrl || "/placeholder.svg"}
                      alt={inforBooking.movieName || "Movie poster"}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                      <span className="text-xs font-medium text-white px-2 py-1 bg-red-600 rounded">
                        {inforBooking.movieRating || "T16"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium">{inforBooking.movieName}</h4>
                    <p className="text-sm text-muted-foreground">2D Phụ Đề</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Rạp:</span>
                      <span>{inforBooking.cinemaHall}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Suất:</span>
                      <span>{inforBooking.showId}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ghế:</span>
                      <span>{inforBooking.seatIds.join(", ")}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Thức ăn & Đồ uống</h4>
                    {cart.length > 0 ? (
                      <div className="space-y-2">
                        {cart.map((item) => (
                          <div
                            key={item.foodId}
                            className="flex justify-between text-sm"
                          >
                            <span>
                              {item.foodName} x{item.quantity}
                            </span>
                            <span>
                              {formatCurrency(item.foodPrice * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Chưa chọn thức ăn
                      </p>
                    )}
                  </div>

                  <div className="border-t pt-4">
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
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-white p-4">
        <div className="container flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => router.push(`/seat-selection/${id}`)}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
          <Button onClick={() => handleSubmit()}>
            Tiếp tục
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

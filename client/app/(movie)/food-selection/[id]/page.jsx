"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchShowDetails } from "@/lib/api";
import { useSeat } from "@/contexts/booking-context";
import axios from "axios";
import { getAllFood } from "@/endpoint/auth";
import { getRefreshToken } from "@/lib/auth/token";

export default function FoodSelectionPage({ params }) {
  const { inforBooking } = useSeat();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = params;
  const selectedSeats = searchParams.get("seats")?.split(",") || [];

  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [food, setFood] = useState([]);
  useEffect(() => {
    console.log("inforBooking:::", inforBooking);

    if (inforBooking.length === 0) {
      router.push(`/seat-selection/${id}`);
    }
  }, [selectedSeats, id]);
  useEffect(() => {
    const userCurrent = localStorage.getItem("user");
    if (userCurrent) {
      setUser(JSON.parse(userCurrent));
    }
  }, []);
  useEffect(() => {
    const { at, rt } = getRefreshToken();
    if (at === "null" && rt === "null") {
      router.push("/login?redirect=/food-selection/" + id);
    } else {
      const fetchFood = async () => {
        const response = await axios.get(
          getAllFood,
          {},
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${at}`,
            },
          }
        );
        if (!response.status === 200) {
          if (response.data.code === 20000) {
            setFood(response.data.metadata);
          }
        }
      };
    }
  });
  // Fetch show details
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchShowDetails(id);
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

  const foodItems = [
    {
      id: 1,
      name: "Combo 1 - Bắp + Nước",
      description: "1 bắp lớn + 1 nước lớn tùy chọn",
      price: 85000,
      image: "/doan.jpg?height=150&width=150",
    },
    {
      id: 2,
      name: "Combo 2 - Bắp + 2 Nước",
      description: "1 bắp lớn + 2 nước vừa tùy chọn",
      price: 99000,
      image: "/doan.jpg?height=150&width=150",
    },
    {
      id: 3,
      name: "Combo Gia Đình",
      description: "2 bắp lớn + 4 nước vừa tùy chọn",
      price: 175000,
      image: "/doan.jpg?height=150&width=150",
    },
    {
      id: 4,
      name: "Bắp Rang Bơ (Lớn)",
      description: "Hộp bắp rang bơ cỡ lớn",
      price: 45000,
      image: "/doan.jpg?height=150&width=150",
    },
    {
      id: 5,
      name: "Coca Cola (Lớn)",
      description: "Ly nước ngọt Coca Cola cỡ lớn",
      price: 40000,
      image: "/doan.jpg?height=150&width=150",
    },
    {
      id: 6,
      name: "Snack Mix",
      description: "Hỗn hợp snack khoai tây, bắp và đậu phộng",
      price: 55000,
      image: "/doan.jpg?height=150&width=150",
    },
  ];

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existingItem = cart.find((item) => item.id === itemId);

    if (existingItem.quantity === 1) {
      setCart(cart.filter((item) => item.id !== itemId));
    } else {
      setCart(
        cart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  const getItemQuantity = (itemId) => {
    const item = cart.find((item) => item.id === itemId);
    return item ? item.quantity : 0;
  };

  const getTotalPrice = () => {
    const foodTotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const ticketPrice = selectedSeats.length * 90000; // Assuming standard price
    return foodTotal + ticketPrice;
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
              {food.map((item) => (
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
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-bold">
                        {inforBooking.totalPrice} VND
                      </span>

                      {getItemQuantity(item.id) > 0 ? (
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-medium">
                            {getItemQuantity(item.id)}
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
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-[300px]">
            <div className="border rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-50">
                <h3 className="font-semibold">Thông tin đặt vé</h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">{inforBooking.movieName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {movieDetails.movieFormat}
                    </p>
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
                            key={item.id}
                            className="flex justify-between text-sm"
                          >
                            <span>
                              {item.name} x{item.quantity}
                            </span>
                            <span>
                              {formatCurrency(item.price * item.quantity)}
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
                        {inforBooking.totalPrice} VND
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
          <Button
            onClick={() =>
              router.push(
                `/payment/${id}?seats=${selectedSeats.join(
                  ","
                )}&food=${encodeURIComponent(JSON.stringify(cart))}`
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

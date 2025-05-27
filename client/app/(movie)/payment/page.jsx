"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clock, ChevronDown } from "lucide-react";
import { useSeat } from "@/contexts/booking-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TicketConfirmationModal from "@/components/booking/ticket-confirmation-modal";
import { useState } from "react";
import axiosClient from "@/lib/auth/axiosClient";
import { vnpay } from "@/endpoint/auth";
export default function CheckoutPage() {
  const { inforBooking } = useSeat();
  const moviePosterUrl = inforBooking.movieImage || "/placeholder.svg";
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(amount)
      .replace(/\s/g, "")
      .replace("₫", " ₫");
  };

  useEffect(() => {
    if (
      !inforBooking.seatIds ||
      !inforBooking.cinemaHall ||
      !inforBooking.showId
    ) {
      router.push(`/`);
    }
  }, []);
  const handleModalClose = () => {
    setOpenModal(false);
  };
  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handlePayment = async () => {
    const paymentData = {
      bookingId: inforBooking.bookingId,
      amount: inforBooking.totalPrice,
    };
    const response = await axiosClient.post(vnpay, paymentData);
    console.log("response", response);
    if (response.status === 200) {
      if (response.data.code === 20000) {
        const vnpUrl = response.data.metadata;
        router.push(vnpUrl);
      } else {
        alert("Thanh toán không thành công");
      }
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/abstract-cinema-logo.png"
            alt="Galaxy Cinema"
            width={140}
            height={50}
            className="h-10 w-auto"
          />
        </Link>
        <button className="text-sm text-gray-500 hover:text-gray-700">
          Huỷ giao dịch ×
        </button>
      </div>

      <div className="border-b">
        <div className="container px-4">
          <div className="flex overflow-x-auto">
            <div className="min-w-[150px] py-3 text-center border-b-2 border-primary text-primary font-medium">
              Chọn phim / Rạp / Suất
            </div>
            <div className="min-w-[100px] py-3 text-center border-b-2 border-primary text-primary font-medium">
              Chọn ghế
            </div>
            <div className="min-w-[100px] py-3 text-center border-b-2 border-primary text-primary font-medium">
              Chọn thức ăn
            </div>
            <div className="min-w-[100px] py-3 text-center border-b-2 border-primary text-primary font-medium">
              Thanh toán
            </div>
            <div className="min-w-[100px] py-3 text-center border-b-2 border-gray-200 text-muted-foreground">
              Xác nhận
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {openModal && (
          <TicketConfirmationModal
            isOpen={handleModalOpen}
            onClose={handleModalClose}
            ticketInfo={inforBooking}
            onPayment={handlePayment}
          />
        )}
        {/* Left Column - Payment Options */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">Khuyến mãi</h2>
            <div className="mb-4">
              <Label htmlFor="promo-code" className="block text-sm mb-2">
                Mã khuyến mãi
              </Label>
              <div className="flex gap-2">
                <Input
                  id="promo-code"
                  type="text"
                  className="border rounded-md p-2 flex-1"
                  placeholder="Nhập mã khuyến mãi"
                />
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">
                  Áp Dụng
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Lưu ý: Có thể áp dụng nhiều vouchers vào 1 lần thanh toán
              </p>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Khuyến mãi của bạn</h3>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Áp dụng điểm Stars</h3>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-4">Phương thức thanh toán</h2>
            <RadioGroup defaultValue="onepay" className="space-y-4">
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="onepay" id="onepay" disabled />
                <Label htmlFor="onepay" className="flex items-center">
                  <Image
                    src="/onepay-logo.png"
                    alt="OnePay"
                    width={80}
                    height={30}
                    className="h-6 w-auto mr-2"
                  />
                  OnePay - Visa, Master, JCB... / ATM / QR Ngân hàng / Apple Pay
                </Label>
              </div>

              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="shopeepay" id="shopeepay" disabled />
                <Label htmlFor="shopeepay" className="flex items-center">
                  <Image
                    src="/shopeepay-orange-logo.png"
                    alt="ShopeePay"
                    width={80}
                    height={30}
                    className="h-6 w-auto mr-2"
                  />
                  Ví ShopeePay - Giảm 5K mỗi đơn khi thanh toán
                </Label>
              </div>

              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="momo" id="momo" disabled />
                <Label htmlFor="momo" className="flex items-center">
                  <Image
                    src="/abstract-purple-wallet.png"
                    alt="MoMo"
                    width={80}
                    height={30}
                    className="h-6 w-auto mr-2"
                  />
                  Ví Điện Tử MoMo
                </Label>
              </div>

              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="zalopay" id="zalopay" disabled />
                <Label htmlFor="zalopay" className="flex items-center">
                  <Image
                    src="/zalopay-logo-display.png"
                    alt="ZaloPay"
                    width={80}
                    height={30}
                    className="h-6 w-auto mr-2"
                  />
                  Zalopay - Bạn mới Zalopay nhập mã GIAMSAU - Giảm 50% tối đa
                  40k
                </Label>
              </div>

              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="payoo" id="payoo" disabled />
                <Label htmlFor="payoo" className="flex items-center">
                  <Image
                    src="/hsbc-payoo-partnership.png"
                    alt="HSBC/Payoo"
                    width={80}
                    height={30}
                    className="h-6 w-auto mr-2"
                  />
                  HSBC/Payoo - ATM/VISA/MASTER/JCB/QRCODE
                </Label>
              </div>

              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="vnpay" id="vnpay" />
                <Label htmlFor="vnpay" className="flex items-center">
                  <Image
                    src="/vnpay-logo-display.png"
                    alt="VNPAY"
                    width={80}
                    height={30}
                    className="h-6 w-auto mr-2"
                  />
                  VNPAY
                </Label>
              </div>
            </RadioGroup>

            <p className="text-xs text-red-500 mt-4">
              (*) Bằng việc click/chạm vào THANH TOÁN bên phải, bạn đã xác nhận
              hiểu rõ các Quy Định Giao Dịch Trực Tuyến của Galaxy Cinema.
            </p>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600">Thời gian giữ ghế:</span>
              <div className="flex items-center text-orange-500 font-medium">
                <Clock className="h-4 w-4 mr-1" />
                <span>06:30</span>
              </div>
            </div>

            <div className="lg:w-[300px]">
              <div className="border rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Thông tin đặt vé</h3>
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
                      {inforBooking.cartfood &&
                      inforBooking.cartfood.length > 0 ? (
                        <div className="space-y-2">
                          {inforBooking.cartfood.map((item) => (
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
                          {formatCurrency(inforBooking.totalPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 border-t bg-white p-4">
        <div className="container flex items-center justify-between">
          <Button variant="outline" onClick={() => router.push(`/`)}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
          <Button
            onClick={handleModalOpen}
            className="bg-orange-500 text-white"
          >
            Thanh toán
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

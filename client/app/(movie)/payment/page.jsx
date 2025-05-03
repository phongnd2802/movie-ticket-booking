import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clock, ChevronDown } from "lucide-react";

export default function CheckoutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
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

      {/* Checkout Steps */}

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
                <RadioGroupItem value="onepay" id="onepay" />
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
                <RadioGroupItem value="shopeepay" id="shopeepay" />
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
                <RadioGroupItem value="momo" id="momo" />
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
                <RadioGroupItem value="zalopay" id="zalopay" />
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
                <RadioGroupItem value="payoo" id="payoo" />
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

            <div className="border-t border-b py-4 my-4">
              <div className="flex gap-4">
                <Image
                  src="/abyssal-dread.png"
                  alt="Movie Poster"
                  width={100}
                  height={150}
                  className="w-24 h-auto rounded-md"
                />
                <div>
                  <h3 className="font-medium">
                    Địa Đạo: Mặt Trời Trong Bóng Tối
                  </h3>
                  <div className="flex gap-2 mt-2">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      2D Phụ Đề
                    </span>
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                      T16
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm">Galaxy Tân Bình - RẠP 1</p>
                    <p className="text-sm">
                      Suất: <span className="font-medium">11:45</span> - Thứ Tư,
                      30/04/2025
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 py-2">
              <div className="flex justify-between text-sm">
                <span>1x VÉ 2D NGƯỜI LỚN LẺ-MEMBER</span>
                <span>110.000 đ</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Ghế: D12</span>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-medium">
                <span>Tổng cộng</span>
                <span className="text-orange-500">110.000 đ</span>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <Button variant="outline" className="flex-1">
                Quay lại
              </Button>
              <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                Thanh Toán
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

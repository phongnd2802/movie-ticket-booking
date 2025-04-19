"use client";

export function OrderSummary({ showDetails, selectedSeats, cart, totalPrice }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(amount)
      .replace(/\s/g, "")
      .replace("₫", " ₫");
  };

  // Mock data for demonstration if needed
  const movieDetails = showDetails || {
    movieName: "Địa Đạo: Mặt Trời Trong Bóng Tối",
    movieFormat: "2D Phụ Đề",
    movieRating: "T16",
    showTime: "10:15",
    showDate: "2025-04-12",
    cinemaName: "Galaxy Nguyễn Du",
    cinemaHall: "RẠP 2",
  };

  // Calculate ticket price
  const ticketPrice = selectedSeats.length * 90000; // Assuming standard price
  const foodTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="lg:w-[300px]">
      <div className="border rounded-lg overflow-hidden sticky top-4">
        <div className="p-4 bg-gray-50">
          <h3 className="font-semibold">Thông tin đặt vé</h3>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">{movieDetails.movieName}</h4>
              <p className="text-sm text-muted-foreground">
                {movieDetails.movieFormat}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rạp:</span>
                <span>
                  {movieDetails.cinemaName} - {movieDetails.cinemaHall}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Suất:</span>
                <span>{movieDetails.showTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ghế:</span>
                <span>{selectedSeats.join(", ")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Giá vé:</span>
                <span>{formatCurrency(ticketPrice)}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Thức ăn & Đồ uống</h4>
              {cart.length > 0 ? (
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm pt-2">
                    <span className="text-muted-foreground">Tổng thức ăn:</span>
                    <span>{formatCurrency(foodTotal)}</span>
                  </div>
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
                  {formatCurrency(totalPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

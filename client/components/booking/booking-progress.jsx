"use client";

export function BookingProgress({ currentStep = 1 }) {
  const steps = [
    { id: 1, name: "Chọn phim / Rạp / Suất" },
    { id: 2, name: "Chọn ghế" },
    { id: 3, name: "Chọn thức ăn" },
    { id: 4, name: "Thanh toán" },
    { id: 5, name: "Xác nhận" },
  ];

  return (
    <div className="border-b">
      <div className="container px-4">
        <div className="flex overflow-x-auto">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`min-w-[100px] py-3 text-center border-b-2 ${
                step.id <= currentStep
                  ? "border-primary text-primary font-medium"
                  : "border-gray-200 text-muted-foreground"
              }`}
            >
              {step.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

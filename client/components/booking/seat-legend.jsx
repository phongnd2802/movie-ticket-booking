"use client";

export function SeatLegend() {
  const legendItems = [
    { color: "bg-red-500", label: "Ghế đã bán" },
    { color: "bg-orange-500", label: "Ghế đang chọn" },
    { color: "border border-blue-300 bg-blue-100", label: "Ghế VIP" },
    { color: "border border-pink-300 bg-pink-100", label: "Ghế đôi" },
    { color: "border border-gray-300 bg-white", label: "Ghế thường" },
  ];

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-6">
      {legendItems.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className={`w-4 h-4 rounded-sm ${item.color}`}></div>
          <span className="text-sm">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

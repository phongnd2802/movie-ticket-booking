"use client";

export function ShowtimeSelector({ showtimes = [], currentShowtime }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="font-medium">Đổi suất chiếu</div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {showtimes.map((time) => (
          <button
            key={time}
            className={`px-4 py-2 text-sm rounded-md min-w-[60px] ${
              time === currentShowtime
                ? "bg-primary text-white"
                : "border hover:bg-gray-100"
            }`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";

export function TheaterCard({ name, address, shows }) {
  const formatTime = (date) => {
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Group shows by hall
  const showsByHall = {};
  shows.forEach((show) => {
    if (!showsByHall[show.hall]) {
      showsByHall[show.hall] = [];
    }
    showsByHall[show.hall].push(show);
  });

  return (
    <div className="border rounded-lg p-6">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{address}</p>
        </div>

        {Object.entries(showsByHall).map(([hall, hallShows]) => (
          <div
            key={hall}
            className="flex flex-col md:flex-row md:items-center justify-between"
          >
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground">{hall}</span>
            </div>
            <div className="mt-2 md:mt-0 flex flex-wrap gap-2">
              {hallShows.map((show) => (
                <Button
                  key={show.id}
                  variant="outline"
                  className="rounded-full"
                  onClick={() => (window.location.href = `/booking/${show.id}`)}
                >
                  {formatTime(show.startTime)}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

export function SeatGrid({ showDetails, selectedSeats, onSeatClick }) {
  const isSeatSelected = (row, col) => {
    return selectedSeats.some((seat) => seat.id === `${row}${col}`);
  };

  const isSeatUnavailable = (row, col) => {
    // Use showDetails.seatMap.unavailableSeats if available, otherwise use default
    const unavailableSeats = showDetails?.seatMap?.unavailableSeats || [
      "K13",
      "K14",
      "J13",
      "J14",
      "I13",
      "I14",
      "I15",
      "H7",
      "H8",
      "H9",
      "H10",
      "H11",
      "H12",
      "H13",
      "H14",
      "H15",
      "G11",
      "G12",
      "G13",
      "G14",
      "G15",
      "F13",
      "F14",
    ];
    return unavailableSeats.includes(`${row}${col}`);
  };

  const isSeatVIP = (row, col) => {
    // Use showDetails.seatMap.vipSeats if available, otherwise use default
    const vipRows = showDetails?.seatMap?.vipSeats || ["F", "G", "H", "I", "J"];
    return vipRows.includes(row) && col >= 7 && col <= 18;
  };

  const isSeatCouple = (row, col) => {
    // Use showDetails.seatMap.coupleSeats if available, otherwise use default
    const coupleRows = showDetails?.seatMap?.coupleSeats || ["O", "P"];
    return coupleRows.includes(row) && col % 2 === 0;
  };

  // Generate rows A-P
  const rows = "ABCDEFGHIJKLMNOP".split("");

  // Generate columns 1-25
  const columns = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-[auto_repeat(25,minmax(24px,1fr))_auto] gap-1">
      {/* Row Headers */}
      <div className="font-medium text-center">P</div>
      {columns.map((col) => (
        <div key={`header-${col}`} className="text-[10px] text-center">
          {col}
        </div>
      ))}
      <div className="font-medium text-center">P</div>

      {/* Seats */}
      {rows.map((row) => (
        <>
          <div
            key={`row-${row}`}
            className="font-medium text-center self-center"
          >
            {row}
          </div>
          {columns.map((col) => {
            const unavailable = isSeatUnavailable(row, col);
            const selected = isSeatSelected(row, col);
            const vip = isSeatVIP(row, col);
            const couple = isSeatCouple(row, col);

            return (
              <button
                key={`seat-${row}${col}`}
                disabled={unavailable}
                onClick={() => onSeatClick(row, col)}
                className={`
                  w-6 h-6 flex items-center justify-center text-[10px] rounded-sm
                  ${
                    unavailable
                      ? "bg-red-500 text-white cursor-not-allowed"
                      : selected
                      ? "bg-orange-500 text-white"
                      : vip
                      ? "bg-blue-100 border border-blue-300 hover:bg-blue-200"
                      : couple
                      ? "bg-pink-100 border border-pink-300 hover:bg-pink-200"
                      : "bg-white border border-gray-300 hover:bg-gray-100"
                  }
                `}
              >
                {unavailable ? "X" : ""}
              </button>
            );
          })}
          <div
            key={`row-end-${row}`}
            className="font-medium text-center self-center"
          >
            {row}
          </div>
        </>
      ))}
    </div>
  );
}

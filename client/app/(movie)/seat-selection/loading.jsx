import { Loader2, Sofa } from "lucide-react";

export default function SeatSelectionLoading() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header skeleton */}
      <div className="border-b">
        <div className="container px-4 py-4 flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded-md w-40 animate-pulse" />
          <div className="h-8 bg-gray-200 rounded-md w-24 animate-pulse" />
        </div>
      </div>

      <div className="flex-1 container px-4 py-8 flex flex-col items-center">
        {/* Screen */}
        <div className="w-full max-w-3xl h-8 bg-gray-200 rounded-t-3xl mb-12 animate-pulse">
          <div className="text-center text-xs text-gray-400 mt-10">
            MÀN HÌNH
          </div>
        </div>

        {/* Seats skeleton */}
        <div className="grid grid-cols-10 gap-2 max-w-3xl mx-auto">
          {Array.from({ length: 80 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-200 rounded-md animate-pulse flex items-center justify-center"
            >
              <Sofa className="h-4 w-4 text-gray-300" />
            </div>
          ))}
        </div>

        {/* Legend skeleton */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-200 rounded-sm animate-pulse" />
              <div className="h-4 bg-gray-200 rounded-md w-16 animate-pulse" />
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-4">
          <div className="container flex items-center justify-between">
            <div className="space-y-1">
              <div className="h-5 bg-gray-200 rounded-md w-32 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded-md w-24 animate-pulse" />
            </div>
            <div className="h-12 bg-gray-200 rounded-md w-32 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-6 flex flex-col items-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h3 className="text-xl font-medium">Đợi chút nha</h3>
        <p className="text-muted-foreground mt-2">
          Đang tải thông tin ghế ngồi...
        </p>
      </div>
    </div>
  );
}

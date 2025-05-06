"use client";

import { Loader2 } from "lucide-react";

export function LoadingState({ message = "Đang tải thông tin..." }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-4">{message}</h2>
        <div className="animate-pulse h-2 w-48 bg-gray-300 rounded mx-auto"></div>
      </div>
    </div>
  );
}

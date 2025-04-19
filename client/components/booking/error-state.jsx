"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ErrorState({ message, returnPath = "/booking" }) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Lỗi</h2>
        <p className="text-red-500">{message}</p>
        <Button onClick={() => router.push(returnPath)} className="mt-4">
          Quay lại danh sách phim
        </Button>
      </div>
    </div>
  );
}

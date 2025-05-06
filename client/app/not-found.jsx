"use client";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BookingNotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold tracking-tighter">404</h1>
          <h2 className="text-3xl font-bold">Ôi hỏng</h2>
          <p className="text-muted-foreground">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã bị gỡ khỏi hệ thống.
          </p>
        </div>

        <div className="w-full max-w-xs mx-auto h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="default"
            className="gap-2"
            onClick={() => router.push("/")}
          >
            <Home size={16} />
            Trang chủ
          </Button>

          <Button
            variant="ghost"
            className="gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft size={16} />
            Quay lại
          </Button>
        </div>
      </div>
    </div>
  );
}

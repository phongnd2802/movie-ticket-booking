import "./globals.css";
import { Nunito } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { BookingProvider } from "@/contexts/booking-context";

const nutino = Nunito({ subsets: ["latin"], weights: [400, 700] });

export const metadata = {
  title: "Galaxy Cinema: Hệ thống rạp chiếu phim",
  description: "Galaxy Cinema: Hệ thống rạp chiếu phim",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nutino.className} antialiased bg-white`}>
        <main className="m-auto ">
          <BookingProvider>{children}</BookingProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}

export default RootLayout;

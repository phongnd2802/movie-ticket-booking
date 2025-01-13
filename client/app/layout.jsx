import "./globals.css";
import { lato } from "@/ui/fonts";
function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lato.className} antialiased`}>{children}</body>
    </html>
  );
}

export default RootLayout;

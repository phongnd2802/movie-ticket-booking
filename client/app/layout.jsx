import "./globals.css";
import { lato } from "@/ui/fonts";
function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lato.className} antialiased bg-white`}>
        <main className="m-auto">{children}</main>
      </body>
    </html>
  );
}

export default RootLayout;

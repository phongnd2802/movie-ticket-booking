import "./globals.css";
import { lato } from "@/ui/fonts";
function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lato.className} antialiased`}>
        <h1>this is layout root</h1>
        {children}
      </body>
    </html>
  );
}

export default RootLayout;

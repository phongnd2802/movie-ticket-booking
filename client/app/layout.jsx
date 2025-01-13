import "./globals.css";

function RootLayout({ children }) {
  return (
    <html>
      <body>
        <h1>this is layout root</h1>
        <>{children}</>
      </body>
    </html>
  );
}

export default RootLayout;

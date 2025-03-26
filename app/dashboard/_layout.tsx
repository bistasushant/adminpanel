
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <NextTopLoader  color="#C16AFB" />
        {children}
      </body>
    </html>
  );
}

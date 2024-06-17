"use client";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { LaTribunaProvider } from "./context/authForm";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <LaTribunaProvider>
        <body>{children}</body>
      </LaTribunaProvider>
    </html>
  );
}

"use client";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { LaTribunaProvider } from "./context/authForm";
import { SideHeaderProvider } from "./context/sideHeader";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <LaTribunaProvider>
        <SideHeaderProvider>
          <body>{children}</body>
        </SideHeaderProvider>
      </LaTribunaProvider>
    </html>
  );
}

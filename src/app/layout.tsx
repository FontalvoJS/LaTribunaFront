"use client";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "react-toastify/dist/ReactToastify.css";
import { LaTribunaProvider } from "./assets/context/auth";
import { SideHeaderProvider } from "./assets/context/sideHeader";
import { SessionProvider } from "./assets/context/session";
import Main from "./assets/components/main/main";
import { ToastContainer } from "react-toastify";
import Header from "./assets/components/header/header";
import Footer from "./assets/components/footer/footer";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LaTribunaProvider>
          <SideHeaderProvider>
            <SessionProvider>
              <Main>
                <ToastContainer
                  draggable
                  theme="dark"
                  autoClose={3000}
                  closeOnClick
                />
                <Header />
                {children}
              </Main>
              <Footer />
            </SessionProvider>
          </SideHeaderProvider>
        </LaTribunaProvider>
      </body>
    </html>
  );
}

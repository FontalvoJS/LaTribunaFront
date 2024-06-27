"use client";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { LaTribunaProvider } from "./context/authForm";
import { SideHeaderProvider } from "./context/sideHeader";
import Main from "./components/main/main";
import { ToastContainer } from "react-toastify";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
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
          </SideHeaderProvider>
        </LaTribunaProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
typeof window !== "undefined" &&
  require("bootstrap/dist/js/bootstrap.bundle.min.js");
import "react-toastify/dist/ReactToastify.css";
import { LaTribunaProvider } from "./assets/context/auth";
import { SideHeaderProvider } from "./assets/context/sideHeader";
import { SessionProvider } from "./assets/context/session";
import Main from "./assets/components/main/main";
import { ToastContainer } from "react-toastify";
import Header from "./assets/components/header/header";
import Footer from "./assets/components/footer/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Liga Betplay, Premier y UEFA | Resultados en Vivo, Tabla de Posiciones y Noticias | La Tribuna",
  description:
    "Sigue la emoción del futbol colombiano e internacional con La Tribuna en cualquier dispositivo. Obtén los resultados en vivo, la tabla de posiciones actualizada, estadísticas detalladas y las últimas noticias sobre tus equipos favoritos. ¡Somos tu fuente de información más confiable para el fútbol colombiano!",
  keywords:
    "Liga BetPlay, resultados en vivo, fútbol colombiano, tabla de posiciones, estadísticas, noticias de fútbol, [nombre de equipos], marcadores en directo, pronósticos, alineaciones, tarjetas amarillas, tarjetas rojas, goles, asistencias, uefa, premier",
  // Open Graph para redes sociales
  openGraph: {
    type: "website", // O 'article' si tienes artículos detallados
    locale: "es_CO", // Idioma y región
    url: "https://la-tribuna-front.vercel.app/",
    title:
      "Transmisiones en vivo, Tabla de Posiciones y Noticias | La Tribuna",
    images: [
      {
        url: "/public/images/Banners/barcelona_hinchada.jpg",
        alt: "Logo de La Tribuna",
        width: 1200,
        height: 630,
      },
    ],
  },
  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    creator: "@latribunacol", // Tu cuenta de Twitter
    site: "@latribunacol",
  },
  // Robots meta tag
  robots: {
    index: true,
    follow: true,
    nosnippet: false,
  },
};
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
                  hideProgressBar
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

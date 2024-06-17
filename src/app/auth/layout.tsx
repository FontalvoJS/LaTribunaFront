import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
// Now import bootstrap js files 
import "bootstrap/dist/js/bootstrap.bundle.min.js";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Noto_Serif, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam-pro",
});

export const metadata: Metadata = {
  title: "Saleem Restaurant | Serving Since 1977",
  description: "Experience Authentic Taste & Luxury Dining. Premium Mughlai restaurant in New Delhi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${notoSerif.variable} ${beVietnamPro.variable}`}>
      <body className="antialiased font-body min-h-screen flex flex-col bg-background text-on-surface">
        {children}
      </body>
    </html>
  );
}

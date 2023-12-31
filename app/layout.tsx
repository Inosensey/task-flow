import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Roboto } from "next/font/google";
import Providers from "@/utils/Providers";
import SlideDownNotification from "@/components/Notification/SlideDownNotification";

export const metadata = {
  title: "Task Flow",
  description: "Managing task made simple",
};

const playFairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair-display",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <SlideDownNotification />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

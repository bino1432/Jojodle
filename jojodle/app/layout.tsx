import type { Metadata } from "next";
import Header from "@/components/Header";
import Home from "./page";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jojodle",
  description: "A game with Jojo theme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return (
    <html lang="en">
      <body className="bg-[url(@/public/images/image/background-image.png)] bg-repeat">
        <Header/>
        {children}
      </body>
    </html>
  );
}

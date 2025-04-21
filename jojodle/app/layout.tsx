import type { Metadata } from "next";
import Header from "@/components/Header";
import BackgroundImg from "@/public/images/background-image.png";
import Home from "./page";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jojodle",
  description: "A game with Jojo theme",
};

export default function RootLayout(){
  return (
    <html lang="en">
      <body className="bg-[url(@/public/images/background-image.png)] bg-repeat">
        <Header/>
        <Home/>
      </body>
    </html>
  );
}

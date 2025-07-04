import type { Metadata } from "next";
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
      <body className="bg-[url('/images/image/background-image.png')] bg-repeat vsc-initialized">
        {children}
      </body>
    </html>
  );
}

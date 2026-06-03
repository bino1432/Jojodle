import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title: "JoJodle",
  description: "JoJodle is a web game inspired by Loldle, where you guess characters from JoJo's Bizarre Adventure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[url('/images/image/background-image.png')] bg-repeat vsc-initialized">
        <UserProvider>
            {children}
        </UserProvider>
      </body>
    </html>
  );
}
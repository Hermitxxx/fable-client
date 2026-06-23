import { Cinzel } from "next/font/google";
import "./globals.css";
import { Toast } from "@heroui/react";

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Fable - Discover Stories Worth Keeping",
  description:
    "A digital platform connecting ebook lovers, readers, and collectors with talented writers. Browse, discover, and read original ebooks.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cinzel.variable} h-full antialiased`}>
      <body
        className="min-h-full flex flex-col">{children}
        <Toast.Provider />
      </body>
    </html>
  );
}

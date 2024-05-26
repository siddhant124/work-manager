import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CustomNavbar } from "@/components/customnavbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <CustomNavbar />
        <main className="flex-grow m-5 mt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

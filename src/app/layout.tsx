"use client";

import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { CustomNavbar } from "@/components/customnavbar";
import { Footer } from "@/components/footer";
import { ToastContainer } from "react-toastify";
import UserProvider from "@/helper/context/user-provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-pink-100  dark:bg-slate-800`}>
        <UserProvider>
          <ToastContainer />
          <CustomNavbar />
          <main className="flex-grow bg-pink-100  dark:bg-slate-800 dark:text-white">
            <div className="m-5 mt-20">{children}</div>
          </main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}

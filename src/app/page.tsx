import { connectDb } from "@/helper/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home: Work Manager",
};

export default function Home() {
  connectDb();
  return (
    <div>
      <h1>Welcome to WORK MANGER</h1>
    </div>
  );
}

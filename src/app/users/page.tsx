import { connectDb } from "@/helper/db";
import React from "react";

export default function page() {
  connectDb();
  return <div>page</div>;
}

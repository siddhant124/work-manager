import { NextResponse } from "next/server";

export function GET() {
  const users = [
    {
      name: "Siddhant Goyal",
      age: 24,
      Designatoin: "Android Developer",
    },
    {
      name: "Adarsh Goyal",
      age: 26,
      Designatoin: "Data Analyst",
    },
    {
      name: "Sahil Jain",
      age: 24,
      Designatoin: "Game Developer",
    },
  ];

  return NextResponse.json(users);
}

export function POST() {}

export function PUT() {}

export function DELETE() {
    console.log("Delete API Called");
    return NextResponse.json(
        {
            message: "Deleted Successfully",
            statusCode: 201,
            success: true
        },{
            status: 201,
            statusText: "Deleted"
        }
    )
}

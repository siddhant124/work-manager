import { NextResponse } from "next/server";

export const getResponseMessage = (
  result: String | String[],
  statusCode: number,
  success: boolean
) => {
  return NextResponse.json(
    {
      result: result,
      success: success,
    },
    {
      status: statusCode,
    }
  );
};

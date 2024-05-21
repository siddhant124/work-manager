import { NextApiRequest } from "next"
import { NextRequest, NextResponse } from "next/server"

export function DELETE(request: NextRequest, {params}){
    console.log(params)
    return NextResponse.json({
        status: "201",
        message: `Deleted Successfully ${params.user}`
    }, {
        status: 201,
        statusText: "Deleted"
    })
} 
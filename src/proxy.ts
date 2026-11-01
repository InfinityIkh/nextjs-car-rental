import { NextRequest, NextResponse } from "next/server";

export function proxy(request : NextRequest){
    const token = request.cookies.get("session")

    if(!token){
        return NextResponse.redirect(
            new URL("/login" ,request.url)
        )
    }
    return NextResponse.next()
}

export const config = {
    matcher : ["/users/:path*"]
}
import { NextRequest, NextResponse } from "next/server";
import { getCurrentSession } from "../session";

export async function authProxy(request: NextRequest) {
    const token = request.cookies.get("session")?.value;

    console.log("Token exists:", !!token);

    const session = await getCurrentSession();

    console.log("Session found:", !!session);

    if (session) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}
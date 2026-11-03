import { NextRequest, NextResponse } from "next/server";
import { getCurrentSession } from "../session";

export async function guestProxy(request : NextRequest){
    const session = await getCurrentSession()
    if(!session){
        return NextResponse.redirect(new URL("/login" ,request.url))
    }return NextResponse.next()
}
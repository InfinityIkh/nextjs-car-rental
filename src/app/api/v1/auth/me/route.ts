import { getCurrentSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest){
    const currentSession = await getCurrentSession()

    if(!currentSession){
        return NextResponse.json({
            message : "unauthenticated",
        } ,{ status : 401 })
    }
    return NextResponse.json({
        userr : currentSession.user
    })
}
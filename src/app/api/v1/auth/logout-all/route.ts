import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const session = await getCurrentSession()
        const cookieStore = await cookies()

        if (!session) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthenticated",
                },
                { status: 401 }
            )
        }

        await prisma.session.deleteMany({
            where: {
                userId : session.user.id
            }
        })
        cookieStore.delete("session")

        return NextResponse.json({
            success: true,
            message: "All devices logged out successfully",
        })
    } catch (error: unknown) {
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error
                    ? error.message
                    : "Internal Server Error",
            },
            { status: 500 }
        )
    }
}
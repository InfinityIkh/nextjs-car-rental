import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getCurrentSession } from "@/lib/session"
import { prisma } from "@/lib/prisma"

export async function POST() {
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
        await prisma.session.delete({
            where: {
                id: session.sessionId,
            },
        })
        cookieStore.delete("session")

        return NextResponse.json({
            success: true,
            message: "User logged out successfully",
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
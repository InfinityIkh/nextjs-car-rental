import { UserService } from "@/services/user.service"
import { UserParams } from "@/types/user.type"
import { updateUserSchema } from "@/validation/user.validation"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: UserParams) {
    try {
        const { id } = await params
        const response = await UserService.getUser(id)

        return NextResponse.json(
            response.data,
            { status : response.status}
        )

    } catch (error: unknown) {
        return NextResponse.json({
            error: error instanceof Error ? error.message : ""
        }, {
            status: 500
        })
    }
}

export async function PUT(request: NextRequest, { params }: UserParams) {
    try {
        const { id } = await params
        const body = await request.json()

        const result = updateUserSchema.safeParse(body)
        if (!result.success) {
            return NextResponse.json({
                success: false,
                message: "validation error",
                error: result.error.flatten().fieldErrors,
            }, { status: 422 })
        }

        const response = await UserService.updateUser(id ,result.data)

        return NextResponse.json(
            response.data,
            { status : response.status}
        )
    } catch (error: unknown) {
        return NextResponse.json({
            error: error instanceof Error ? error.message : ""
        }, {
            status: 500
        })
    }
}

export async function DELETE(request: NextRequest, { params }: UserParams) {
    try {
        const { id } = await params
        
        const response = await UserService.deleteUser(id)
        return NextResponse.json(
            response.data,
            { status : response.status}
        )
    } catch (error: unknown) {
        return NextResponse.json({
            succes: false,
            error: error instanceof Error ? error.message : ""
        }, { status: 500 })
    }
}
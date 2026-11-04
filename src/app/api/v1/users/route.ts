import { UserService } from "@/services/user.service"
import { userSchema } from "@/validation/user.validation"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await UserService.getAll()
    return NextResponse.json(
        response.data,
      { status: response.status }
    )
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: "Users fetching failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = userSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "validation error",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const response = await UserService.createUser(result.data)
    
    return NextResponse.json(
      response.data,
      { status: response.status }
    )
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    )
  }
}
import { userSchema } from "@/validation/user.validation"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const users = await GetUsers()
    return NextResponse.json({
      success: true,
      message: "Users fetched successfully",
      users,
    })
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
          errors: result.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const data = result.data
    const existingUser = await GetUserByEmail(data.email)
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          errors: {
            email: ["User email already exists"],
          },
        },
        { status: 409 }
      )
    }

    const createdUser = await Createuser(data)
    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        user: createdUser,
      },
      { status: 201 }
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
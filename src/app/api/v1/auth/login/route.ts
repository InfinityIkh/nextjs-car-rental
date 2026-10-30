import { NextRequest, NextResponse } from "next/server"
import { compare } from "bcryptjs"
import { createHash, randomBytes } from "node:crypto"
import { prisma } from "@/lib/prisma"
import { LoginInput, loginSchema } from "@/validation/auth.validation"

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json()
    const result = loginSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        {
          succes: false,
          errors: result.error.flatten().fieldErrors,
        },
        { status: 422 },
      )
    }

    const { email ,password , } : LoginInput = result.data
    const normalizedEmail = email.trim().toLowerCase();
    const user = await prisma.user.findUnique({
      where: {
        email : normalizedEmail
       },
    })
    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid email or password.",
        },
        { status: 401 },
      )
    }

    const isPasswordValid = await compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: "Invalid email or password.",
        },
        { status: 401 },
      )
    }

    const sessionToken = randomBytes(32).toString("hex")
    const tokenHash = createHash("sha256").update(sessionToken).digest("hex")
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    await prisma.session.create({
      data: {
        token: tokenHash,
        userId: user.id,
        expiresAt,
      },
    })
    const response = NextResponse.json({
      succes : true ,
      message: "Login successful." ,
      user: {
        id: user.id,
        name: user.username,
        email: user.email,
      },
    })

    response.cookies.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: expiresAt,
    })
    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "internal server error",
      },
      { status: 500 },
    )
  }
}
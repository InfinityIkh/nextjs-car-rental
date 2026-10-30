import { prisma } from "@/lib/prisma";
import { RegisterInput, registerSchema } from "@/validation/auth.validation";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = registerSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      {
        succes: false,
        errors: result.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const { username, email, password } : RegisterInput = result.data;
  const normalizedEmail = email.trim().toLowerCase();

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
      select: {
        id: true,
      },
    });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to create account with this email.",
        },
        { status: 422 },
      );
    }
    const passwordHash = await hash(password, 12);
    await prisma.user.create({
      data: {
        username,
        email: normalizedEmail,
        password: passwordHash,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Account created successfully.",
    });
  } catch (error) {
    return NextResponse.json({
        succes : false,
        error : error instanceof Error ? error.message : "Internal Server Error"
    } ,{ status : 500 })
  }
}

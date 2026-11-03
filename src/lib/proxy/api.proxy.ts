import { NextRequest, NextResponse } from "next/server"
import { getCurrentSession } from "../session"

export async function apiProxy(request: NextRequest) {
  const session = await getCurrentSession()

  if (!session) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 })
  }return NextResponse.next()
}

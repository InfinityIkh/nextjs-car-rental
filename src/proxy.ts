import { NextRequest } from "next/server"
import { authProxy } from "./lib/proxy/auth.proxy"
import { guestProxy } from "./lib/proxy/guest.proxy"
import { apiProxy } from "./lib/proxy/api.proxy"

const authUrls = ["/login", "/register"]
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/api")) {
    return apiProxy(request)
  }
  if (authUrls.includes(pathname)) {
    return authProxy(request)
  }

  return guestProxy(request)
}

export const config = {
  matcher: ["/api/:path*", "/login", "/register", "/", "/users/:path*"],
}

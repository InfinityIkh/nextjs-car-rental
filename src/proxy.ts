import { NextRequest } from "next/server"
import { authProxy } from "./lib/proxy/auth.proxy"
import { guestProxy } from "./lib/proxy/guest.proxy"
import { apiProxy } from "./lib/proxy/api.proxy"

const authUrls = ["/login", "/register"]
const authEndepoints = ["/api/v1/auth/login", "/api/v1/auth/register"]
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  if(authEndepoints.includes(pathname)){
    return
  }
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

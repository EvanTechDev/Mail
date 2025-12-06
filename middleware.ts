import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  if (pathname === "/password") return NextResponse.next()

  const token = req.cookies.get("access_token")?.value

  if (!token) {
    return NextResponse.redirect(new URL("/password", req.url))
  }

  try {
    const secret = new TextEncoder().encode(process.env.ACCESS_JWT_SECRET)
    await jwtVerify(token, secret)
    return NextResponse.next()
  } catch (err) {
    return NextResponse.redirect(new URL("/password", req.url))
  }
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
}

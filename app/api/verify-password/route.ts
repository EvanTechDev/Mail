import { NextResponse } from "next/server"
import { SignJWT } from "jose"

export async function POST(req: Request) {
  const { password } = await req.json()

  if (password !== process.env.ACCESS_PASSWORD) {
    return new NextResponse("Forbidden", { status: 403 })
  }

  const secret = new TextEncoder().encode(process.env.ACCESS_JWT_SECRET)

  const token = await new SignJWT({ role: "access" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("5m")
    .setIssuedAt()
    .sign(secret)

  const res = NextResponse.json({ success: true })

  res.cookies.set("access_token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 5,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  })

  return res
}

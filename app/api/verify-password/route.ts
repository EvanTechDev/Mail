import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  const { password } = await request.json()

  const ok = await bcrypt.compare(
    password,
    process.env.ACCESS_PASSWORD_HASH!
  )

  if (!ok) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const token = jwt.sign(
    { access: true },
    process.env.JWT_SECRET!,
    { expiresIn: '5m' }
  )

  const res = NextResponse.json({ ok: true })
  res.cookies.set('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 5,
  })

  return res
}

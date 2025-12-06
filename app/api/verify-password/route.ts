import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
  const { password } = await req.json()

  const hash = process.env.ACCESS_PASSWORD_HASH!
  const isValid = await bcrypt.compare(password, hash)

  if (!isValid) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const token = jwt.sign({ access: true }, process.env.JWT_SECRET!, { expiresIn: '5m' })
  const res = NextResponse.json({ ok: true })
  res.cookies.set('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 5 * 60,
  })

  return res
}


import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
  const { password } = await req.json()
  const ok = await bcrypt.compare(password, process.env.ACCESS_PASSWORD_HASH!)

  if (!ok) {
    return NextResponse.redirect('/password?error=1')
  }

  const token = jwt.sign({ access: true }, process.env.JWT_SECRET!, { expiresIn: '5m' })
  const res = NextResponse.redirect('/')
  res.cookies.set('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 5,
  })

  return res
}

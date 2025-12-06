import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

const SESSIONS = new Map<string, number>() // <token, expiration>

export async function POST(request: Request) {
  const { password } = await request.json()

  const ok = await bcrypt.compare(
    password,
    process.env.ACCESS_PASSWORD_HASH!
  )

  if (!ok) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const token = crypto.randomBytes(32).toString('hex')
  const expires = Date.now() + 5 * 60 * 1000
  SESSIONS.set(token, expires)

  const response = NextResponse.json({ ok: true })
  response.cookies.set('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 5 * 60,
  })

  return response
}

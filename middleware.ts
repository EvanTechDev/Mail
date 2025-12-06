import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SESSIONS } from './lib/sessions'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value

  if (!token) {
    return NextResponse.redirect('/password')
  }

  const expires = SESSIONS.get(token)

  if (!expires || expires < Date.now()) {
    return NextResponse.redirect('/password')
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

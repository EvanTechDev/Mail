import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hasValidPassword = request.cookies.has('access_token')

  if (request.nextUrl.pathname === '/password') {
    return NextResponse.next()

  if (!hasValidPassword) {
    return NextResponse.redirect(new URL('/password', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

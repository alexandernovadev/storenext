import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from './utils/joseJwt'

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/checkout')) {
    const token = req.cookies.get('token')?.value.toString() || ''

    try {
      await verify(token)
      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(
        new URL('/auth/login?p=/checkout/address', req.url),
      )
    }
  }
}

export const config = {
  matcher: '/checkout/:path*',
}

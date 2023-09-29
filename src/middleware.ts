import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/checkout')) {
    // If cart is empty should redirecto to /cart/empty
    const cartCookie = req.cookies.get('cart')?.value.toString()
    const cart = cartCookie ? JSON.parse(cartCookie) : []

    if (cart.length === 0) {
      const url = req.nextUrl.clone()
      url.pathname = '/cart/empty'
      return NextResponse.redirect(url)
    }

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (!session) {
      const requestedPage = req.nextUrl.pathname
      const url = req.nextUrl.clone()
      url.pathname = `/auth/login`
      url.search = `p=${requestedPage}`
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  }

  if (req.nextUrl.pathname.startsWith('/admin')) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (!session) {
      const requestedPage = req.nextUrl.pathname
      const url = req.nextUrl.clone()
      url.pathname = `/auth/login`
      url.search = `p=${requestedPage}`
      return NextResponse.redirect(url)
    }

    const validRoles = ['admin', 'super-user', 'SEO']
    // @ts-ignore
    if (!validRoles.includes(session.user.role)) {
      const requestedPage = req.nextUrl.pathname
      const url = req.nextUrl.clone()
      url.pathname = ``
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  }
  if (req.nextUrl.pathname.startsWith('/auth')) {
    console.log('entoooo')

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    console.log(session)

    if (session) {
      const requestedPage = req.nextUrl.pathname
      const url = req.nextUrl.clone()
      url.pathname = ``
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/checkout/:path*', '/admin/:path*', '/auth/:path*'],
}

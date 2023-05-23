import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { verify } from './utils/joseJwt'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/checkout')) {

    // If cart is empty should redirecto to /cart/empty
    const cartCookie = req.cookies.get('cart')?.value.toString();
    const cart = cartCookie ? JSON.parse(cartCookie) : [];

    if (cart.length === 0) {
      const url = req.nextUrl.clone();
      url.pathname = '/cart/empty';
      return NextResponse.redirect(url);
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

    // Methos old to JWT
    // const token = req.cookies.get('token')?.value.toString() || ''

    // try {
    //   await verify(token)
    //   return NextResponse.next()
    // } catch (error) {
    //   return NextResponse.redirect(
    //     new URL('/auth/login?p=/checkout/address', req.url),
    //   )
    // }
  }
}

export const config = {
  matcher: '/checkout/:path*',
}

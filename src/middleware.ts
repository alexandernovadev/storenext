// import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { jwt } from './utils'

export async function middleware(req: NextRequest) {}
// export async function middleware(req: NextRequest) {
//   if (req.nextUrl.pathname.startsWith('/checkout/address')) {
//     const token = req.cookies.get('token')?.value || ''

//     try {
//       await jwt.isValidToken(token)
//       return NextResponse.next()
//     } catch (error) {
//       const newUrl = new URL('/auth/login?p=/checkout/address', req.url)
//       return NextResponse.redirect(newUrl)
//     }
//   }
// }

// export const config = {
//   matcher: '/checkout/:path*',
// }

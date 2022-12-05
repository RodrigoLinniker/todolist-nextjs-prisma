import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
 
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!session) {
    return NextResponse.redirect(new URL('/', req.url))
    
  }


  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard'
}
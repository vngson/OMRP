/* eslint-disable react-hooks/rules-of-hooks */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { useSelector } from 'react-redux';
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
 
  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next();
  
  // if (request.nextUrl.pathname.startsWith('/busniness')) {
  //   return NextResponse.rewrite(new URL('/', request.url));
  // }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '',
};
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // If logged out, redirect to '/login' page
  if (request.nextUrl.pathname.startsWith('/home') && !request.cookies.has('connect.sid')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

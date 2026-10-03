import { clerkMiddleware } from '@clerk/nextjs/server';
import { Role } from './generated/enums';
import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

export default clerkMiddleware(async (auth, req) => {
  const isRecruiter = ((await auth()).sessionClaims?.metadata as { role?: Role } | undefined)?.role === "RECRUITER";

  const { pathname } = req.nextUrl;
  const isRecruiterRoute = pathname.startsWith("/recruiter");

  if (isRecruiterRoute && !isRecruiter) {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/__clerk/:path*',
    '/(api|trpc)(.*)',
  ],
};
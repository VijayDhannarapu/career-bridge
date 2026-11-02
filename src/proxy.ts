import { clerkMiddleware } from '@clerk/nextjs/server';
import { Role } from './generated/enums';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from './lib/prisma';

export default clerkMiddleware(async (auth, req) => {
  const {sessionClaims} = await auth();
  const isRecruiter = (sessionClaims?.metadata as { role?: Role } | undefined)?.role === "RECRUITER";

  const { pathname } = req.nextUrl;
  const isRecruiterRoute = pathname.startsWith("/recruiter");
  const isRecruiterOnboarding =
    pathname.startsWith("/recruiter/onboarding");

  if (isRecruiterRoute && !isRecruiter && !isRecruiterOnboarding) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (!isRecruiterRoute && isRecruiter) {
    const url = new URL("recruiter/addJob", req.url);
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
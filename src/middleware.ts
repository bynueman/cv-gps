import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Protects /admin/* and /api/admin/* — everything else on the site
 * (all public marketing pages) is untouched, since this only matches
 * the paths listed in `config.matcher` below.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // The login page itself, and NextAuth's own routes, must stay reachable.
  if (pathname === "/admin/login") return NextResponse.next();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

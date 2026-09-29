import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const AUTH_SECRET =
  process.env.NEXTAUTH_SECRET ||
  process.env.AUTH_SECRET ||
  "zaltrex-enterprise-super-secret-key-prod-omega-2026";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    const isHttps =
      req.nextUrl.protocol === "https:" ||
      req.headers.get("x-forwarded-proto") === "https";

    // 1. Try with HTTPS secureCookie
    let token = await getToken({
      req,
      secret: AUTH_SECRET,
      secureCookie: isHttps,
    });

    // 2. If null, try without secureCookie (for reverse proxies)
    if (!token) {
      token = await getToken({
        req,
        secret: AUTH_SECRET,
        secureCookie: false,
      });
    }

    // 3. Fallback to authjs specific cookie names
    if (!token) {
      token = await getToken({
        req,
        secret: AUTH_SECRET,
        cookieName: isHttps ? "__Secure-authjs.session-token" : "authjs.session-token",
      });
    }

    const isAuthorized = Boolean(token && token.role === "ADMIN");

    if (!isAuthorized) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

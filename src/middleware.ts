import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get stored auth data from cookies instead of localStorage
  console.log("Middleware calling");
  const authToken = request.cookies.get("auth_token")?.value;
  const isAuthPage = ["/login", "/register"].includes(request.nextUrl.pathname);

  if (!authToken && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (authToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

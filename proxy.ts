import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-lunartulip-locale", request.nextUrl.pathname === "/en" || request.nextUrl.pathname.startsWith("/en/") ? "en" : "zh-CN");
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.svg|opengraph-image).*)"],
};

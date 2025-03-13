import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || "";

  //will return the route name to which the request is made
  const path = request.nextUrl.pathname;

  //path which are open to everyone
  const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyemail";

  // if its a public path
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL(`${path}`, request.nextUrl));
  }

  //if it is not a public path
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

//routes on which you want to test middleware
export const config = {
  matcher: ["/", "/login", "/signup", "/profile","/verifyemail"],
};

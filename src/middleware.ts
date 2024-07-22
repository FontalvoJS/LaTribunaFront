import { verifySession } from "@/app/assets/services/auth";
import { NextResponse, NextRequest } from "next/server";
export default async function middleware(request: NextRequest) {
  // try {
  //   const tokenJWT = request.cookies.get("jwt");
  //   if (tokenJWT) {
  //     const isValid = await verifySession(tokenJWT.value);
  //     if (isValid) {
  //       return NextResponse.next();
  //     } else {
  //       return NextResponse.redirect(new URL("/?unauthorized=true", request.url));
  //     }
  //   } else {
  //     return NextResponse.redirect(new URL("/?unauthorized=true", request.url));
  //   }
  // } catch (error: unknown) {
  //   return NextResponse.redirect(new URL("/?unauthorized=true", request.url));
  // }
};

export const config = {
  matcher: ['/profile', '/streaming']
};
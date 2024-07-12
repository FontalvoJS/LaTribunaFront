import { NextResponse } from "next/server";
// import { verifySession } from "./assets/services/auth";
export default async function middleware(res: NextResponse) {
  // verify if the route is restricted
  // const hasToken = await verifySession();
  // if (!hasToken) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // } else {
  //   return NextResponse.next();
  // }
  return NextResponse.redirect('/login')
};

export const config = {
  matcher: ["/perfil"],
};
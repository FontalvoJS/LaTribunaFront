import { NextRequest, NextResponse } from "next/server";
import { User } from "@/app/assets/types/types";
export const authMiddleware = (req: NextRequest, res: NextResponse) => {
  const restrictedRoutes = [
    "/perfil",
    "/transmisiones",
    "/blog",
    "/discuciones",
  ];
  // verify if the route is restricted
  if (restrictedRoutes.includes(req.nextUrl.pathname)) {
    
  }
};

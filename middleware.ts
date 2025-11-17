import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isAdmin = req.cookies.get("admin_authenticated")?.value === "true";

  const path = req.nextUrl.pathname;

  // Permitir login SEM verificação
  if (path === "/admin/login") {
    return NextResponse.next();
  }

  // Proteger qualquer rota que comece com /admin
  if (path.startsWith("/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

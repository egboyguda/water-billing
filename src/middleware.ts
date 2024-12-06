import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/auth";
import { cookies } from "next/headers";

// Define route categories
const routes = {
  admin: ["/", "/usage", "/billing", "/complaint", "/customer"],
  customer: ["/user", "/user/billing", "/user/usage", "/user/complaint"],
  public: ["/login"],
};

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Check route type
  const isAdminRoute = routes.admin.includes(path);
  const isPublicRoute = routes.public.includes(path);

  // Get and decrypt the session cookie
  const cookie = (await cookies()).get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null;

  // Redirect unauthenticated users on protected routes to /login
  if (isAdminRoute && session?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Redirect authenticated users on public routes to their dashboard
  if (isPublicRoute && session?.userId) {
    const dashboardRoute = session?.role === "ADMIN" ? "/" : "/user";
    return NextResponse.redirect(new URL(dashboardRoute, req.nextUrl));
  }

  // Allow access to customer-specific routes only for customers
  const isCustomerRoute = routes.customer.includes(path);
  if (isCustomerRoute && session?.role !== "CUSTOMER") {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Continue processing the request
  return NextResponse.next();
}

// Exclude specific routes from middleware
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|otf|eot|css|js)$).*)",
  ],
};

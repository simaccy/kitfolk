import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/auth";

// Routes that make up the authenticated app. All require sign-in.
const APP_ROUTES = [
  "/discover",
  "/calls",
  "/circles",
  "/profile",
  "/messages",
  "/bookings",
  "/crew/",
  "/kit/",
  "/onboarding",
];

const ONBOARDED_COOKIE = "kf-onboarded";

function isAppRoute(pathname: string): boolean {
  return APP_ROUTES.some(
    (r) => pathname === r || pathname === r.replace(/\/$/, "") || pathname.startsWith(r),
  );
}

export async function proxy(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  const isApp = host.startsWith("app.");
  const { pathname } = req.nextUrl;
  const session = await auth();
  const onboarded = req.cookies.get(ONBOARDED_COOKIE)?.value === "1";

  // ── Sign-in page: if already signed in, push them onward
  if (pathname === "/sign-in" && session) {
    const url = req.nextUrl.clone();
    url.pathname = onboarded ? "/discover" : "/onboarding";
    url.searchParams.delete("from");
    url.searchParams.delete("error");
    return NextResponse.redirect(url);
  }

  // ── App routes require auth
  if (isAppRoute(pathname) && !session) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // ── Once signed in, send first-timers through onboarding
  if (
    session &&
    !onboarded &&
    isAppRoute(pathname) &&
    pathname !== "/onboarding"
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/onboarding";
    return NextResponse.redirect(url);
  }

  // ── On app.kitfolk.com, root → app
  if (isApp && pathname === "/") {
    const url = req.nextUrl.clone();
    if (!session) {
      url.pathname = "/sign-in";
    } else {
      url.pathname = onboarded ? "/discover" : "/onboarding";
    }
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Run on everything except Next internals, the auth API and static assets.
  matcher: [
    "/((?!_next/|api/auth|favicon|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|map)$).*)",
  ],
};

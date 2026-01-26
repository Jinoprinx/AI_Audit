import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const isAuth = !!token;
        const isVerified = !!token?.emailVerified;
        const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
        const isAuditPage = req.nextUrl.pathname.startsWith("/audit");

        if (isAuditPage) {
            if (!isAuth) {
                return NextResponse.redirect(new URL("/auth/login", req.url));
            }
            if (!isVerified) {
                return NextResponse.redirect(new URL("/auth/verify-request", req.url));
            }
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: "/auth/login",
        },
    }
);

export const config = {
    matcher: ["/audit/:path*"],
};

import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in/[[...index]]" , "/teacher"],
  // clerk settings
  afterAuth(auth, req, res) {
    // handle users who aren't authenticated

    if (!auth.userId && !auth.isPublicRoute) {
      console.log("redirecting to sign in");
      console.log(auth.userId, auth.isPublicRoute);
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    if (auth.userId && req.nextUrl.pathname == "/sign-in") {
      const dashboard = new URL("/dashboard", req.url);
      return NextResponse.redirect(dashboard.href);
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

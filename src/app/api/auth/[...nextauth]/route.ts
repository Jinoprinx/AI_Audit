import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

if (!process.env.NEXTAUTH_SECRET) {
    console.error("⚠️ NEXTAUTH_SECRET is not set! Authentication will likely fail in production.");
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

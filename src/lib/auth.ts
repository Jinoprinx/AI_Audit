import { User } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { env } from "./env";

export const authOptions: NextAuthOptions = {
    debug: true, // Enable debug logs to investigate 500 error
    logger: {
        error(code, metadata) {
            console.error("NextAuth Error:", code, metadata);
        },
        warn(code) {
            console.warn("NextAuth Warn:", code);
        },
        debug(code, metadata) {
            console.log("NextAuth Debug:", code, metadata);
        }
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log("[Auth] Authorizing user:", credentials?.email);
                if (!credentials?.email || !credentials?.password) {
                    console.warn("[Auth] Missing credentials");
                    throw new Error("Invalid credentials");
                }

                try {
                    const user: User | null = await prisma.user.findUnique({
                        where: { email: credentials.email },
                    });

                    if (!user || !user.passwordHash) {
                        console.warn("[Auth] User not found or no hash:", credentials.email);
                        throw new Error("User not found");
                    }

                    console.log("[Auth] Comparing passwords...");
                    const isValid = await bcrypt.compare(credentials.password, user.passwordHash);

                    if (!isValid) {
                        console.warn("[Auth] Invalid password for:", credentials.email);
                        throw new Error("Invalid password");
                    }

                    console.log("[Auth] Login successful:", credentials.email);
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        emailVerified: user.emailVerified
                    } as any;
                } catch (error) {
                    console.error("[Auth] Authorize error:", error);
                    throw error;
                }
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            try {
                if (user) {
                    token.id = user.id;
                    token.emailVerified = (user as any).emailVerified;
                }
                if (trigger === "update" && session?.emailVerified) {
                    token.emailVerified = session.emailVerified;
                }
                return token;
            } catch (error) {
                console.error("Error in JWT callback:", error);
                return token;
            }
        },
        async session({ session, token }) {
            try {
                if (token && session.user) {
                    (session.user as any).id = token.id;
                    (session.user as any).emailVerified = token.emailVerified;
                }
                return session;
            } catch (error) {
                console.error("Error in Session callback:", error);
                return session;
            }
        }
    },
    pages: {
        signIn: "/auth/login",
    },
    secret: env.NEXTAUTH_SECRET,
};

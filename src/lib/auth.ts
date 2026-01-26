import { User } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                const user: User | null = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || !user.passwordHash) {
                    throw new Error("User not found");
                }
                const isValid = await bcrypt.compare(credentials.password, user.passwordHash);

                if (!isValid) {
                    throw new Error("Invalid password");
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    emailVerified: user.emailVerified
                };
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
    secret: process.env.NEXTAUTH_SECRET,
};

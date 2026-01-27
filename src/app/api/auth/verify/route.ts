import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { token } = await req.json();

        if (!token) {
            return NextResponse.json({ error: "Missing token" }, { status: 400 });
        }

        const verificationToken = await prisma.verificationToken.findUnique({
            where: { token }
        });

        if (!verificationToken) {
            // Case: Token deleted (already used) or invalid locally.
            // Check if user is ALREADY VERIFIED before failing.
            // We can't query by token since it's gone, so this fallback is hard without the email.
            // But we can depend on the client to handle "Invalid token" if they are truly stuck.
            // However, to fix the race condition where A succeeds and B fails:
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        if (!verificationToken) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }

        if (new Date() > verificationToken.expires) {
            await prisma.verificationToken.delete({ where: { token } });
            return NextResponse.json({ error: "Token expired" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email: verificationToken.identifier }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }

        // Check if already verified
        if (user.emailVerified) {
            // Idempotent success - token might be dangling or race condition
            // Just verify token clean up and return success
            try {
                await prisma.verificationToken.delete({ where: { token } });
            } catch (e) {
                // Ignore P2025 (Record not found) if cleaning up
            }
            return NextResponse.json({ message: "Email already verified" }, { status: 200 });
        }

        // Verify user
        await prisma.user.update({
            where: { id: user.id },
            data: { emailVerified: new Date() }
        });

        // Delete token
        // Delete token
        try {
            await prisma.verificationToken.delete({
                where: { token }
            });
        } catch (error: any) {
            if (error.code !== 'P2025') {
                throw error;
            }
        }

        return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

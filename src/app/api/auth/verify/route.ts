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

        // Verify user
        await prisma.user.update({
            where: { id: user.id },
            data: { emailVerified: new Date() }
        });

        // Delete token
        await prisma.verificationToken.delete({
            where: { token }
        });

        return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

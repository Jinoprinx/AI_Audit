import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "@/lib/mail";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            console.warn("Signup failed: Missing fields", { name, email: !!email, password: !!password });
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // Check email
        console.log("[Signup] Checking existing user...");
        const start = Date.now();
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });
        console.log(`[Signup] DB check took ${Date.now() - start}ms`);

        if (existingUser) {
            console.warn("Signup failed: Email already in use", email);
            return NextResponse.json({ error: "Email already in use" }, { status: 400 });
        }

        console.log("[Signup] Hashing password...");
        const hashStart = Date.now();
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(`[Signup] Hashing took ${Date.now() - hashStart}ms`);

        console.log("[Signup] Creating user...");
        const createStart = Date.now();
        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash
            }
        });
        console.log(`[Signup] User creation took ${Date.now() - createStart}ms`);

        // Create verification token
        console.log("[Signup] Creating verification token...");
        const token = uuidv4();
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        await prisma.verificationToken.create({
            data: {
                identifier: email,
                token,
                expires
            }
        });

        // Send email
        console.log("[Signup] Sending verification email...");
        const emailStart = Date.now();
        await sendVerificationEmail(email, token);
        console.log(`[Signup] Email sending took ${Date.now() - emailStart}ms`);

        console.log("[Signup] Signup completed successfully");
        return NextResponse.json({ message: "User created. Verification email sent." }, { status: 201 });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

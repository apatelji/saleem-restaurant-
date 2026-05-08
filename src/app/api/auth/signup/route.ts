import { NextResponse } from 'next/server';
import { prisma } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/lib/email';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json();

    if (!name || !email || !password || !phone) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash,
        verificationToken,
      },
    });

    const verifyLink = `http://localhost:3000/api/auth/verify?token=${verificationToken}`;
    
    await sendEmail(
      email,
      'Verify Your Email - Saleem Restaurant',
      `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #121414; color: #e2e2e2; border: 1px solid #e9c349;">
        <h1 style="color: #e9c349; text-align: center;">Saleem Restaurant</h1>
        <p>Dear ${name},</p>
        <p>Welcome to Saleem Restaurant. Please verify your email address to activate your account.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verifyLink}" style="background-color: #e9c349; color: #3c2f00; padding: 12px 24px; text-decoration: none; font-weight: bold; text-transform: uppercase;">Verify Email</a>
        </div>
        <p>If you didn't create an account, you can safely ignore this email.</p>
      </div>
      `
    );

    return NextResponse.json({ 
      message: 'User created. Please check your email to verify.',
      verifyLink: process.env.NODE_ENV !== 'production' ? verifyLink : undefined
    }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

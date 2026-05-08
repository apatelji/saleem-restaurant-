import { NextResponse } from 'next/server';
import { getUserFromCookie } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // exclude password hash
    const { passwordHash, verificationToken, resetToken, resetTokenExpiry, ...safeUser } = user;
    
    return NextResponse.json({ user: safeUser });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

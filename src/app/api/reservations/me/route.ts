import { NextResponse } from 'next/server';
import { prisma, getUserFromCookie } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const reservations = await prisma.reservation.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ reservations });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

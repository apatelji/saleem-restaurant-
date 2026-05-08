import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only';

export const prisma = new PrismaClient();

export const signToken = (payload: any) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

export const getUserFromCookie = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;
  const decoded: any = verifyToken(token);
  if (!decoded) return null;
  return await prisma.user.findUnique({ where: { id: decoded.userId } });
};

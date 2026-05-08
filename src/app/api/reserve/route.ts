import { NextResponse } from 'next/server';
import { prisma, getUserFromCookie } from '@/lib/auth';
import { sendEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, guests, date, time, requests } = body;

    if (!name || !phone || !date || !time || !guests) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const user = await getUserFromCookie();
    const bookingId = "SLM" + Math.floor(1000 + Math.random() * 9000);

    const reservation = await prisma.reservation.create({
      data: {
        bookingId,
        customerName: name,
        phone,
        email,
        guests: parseInt(guests),
        date,
        time,
        specialRequest: requests,
        userId: user ? user.id : null,
      },
    });

    let customerEmailUrl: string | boolean = false;
    let ownerEmailUrl: string | boolean = false;

    // Send Confirmation Email to Customer
    if (email) {
      customerEmailUrl = await sendEmail(
        email,
        'Your Reservation at Saleem Restaurant is Confirmed',
        `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #121414; color: #e2e2e2; border: 1px solid #e9c349;">
          <h1 style="color: #e9c349; text-align: center;">Saleem Restaurant</h1>
          <p>Dear ${name},</p>
          <p>Thank you for choosing Saleem Restaurant.</p>
          <p>Your table reservation has been confirmed successfully.</p>
          <div style="background-color: #1a1c1c; padding: 15px; border-left: 4px solid #e9c349; margin: 20px 0;">
            <h3 style="color: #e9c349; margin-top: 0;">Booking Details:</h3>
            <ul style="list-style: none; padding: 0; line-height: 1.8;">
              <li><strong>Booking ID:</strong> #${bookingId}</li>
              <li><strong>Date:</strong> ${date}</li>
              <li><strong>Time:</strong> ${time}</li>
              <li><strong>Guests:</strong> ${guests}</li>
              <li><strong>Location:</strong> HS-24, Kailash Colony Market, Greater Kailash, New Delhi</li>
            </ul>
          </div>
          <p>For assistance contact:</p>
          <p>Phone: 01141631786<br>WhatsApp: +91 9810570198</p>
          <p>We look forward to serving you.</p>
          <p>Regards,<br>Saleem Restaurant</p>
        </div>
        `
      );
    }

    // Send Notification Email to Owner
    const ownerEmail = process.env.OWNER_EMAIL || "admin@saleemrestaurant.com";
    ownerEmailUrl = await sendEmail(
      ownerEmail,
      `New Reservation Received: #${bookingId}`,
      `
      <h2>New Reservation Alert</h2>
      <p>A new reservation has been made at Saleem Restaurant.</p>
      <ul>
        <li><strong>Customer Name:</strong> ${name}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Email:</strong> ${email || 'N/A'}</li>
        <li><strong>Guests:</strong> ${guests}</li>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${time}</li>
        <li><strong>Special Requests:</strong> ${requests || 'None'}</li>
      </ul>
      <p>Log in to the admin dashboard to manage this booking.</p>
      `
    );

    return NextResponse.json({ 
      reservation,
      customerEmailUrl: typeof customerEmailUrl === 'string' ? customerEmailUrl : undefined,
      ownerEmailUrl: typeof ownerEmailUrl === 'string' ? ownerEmailUrl : undefined
    }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

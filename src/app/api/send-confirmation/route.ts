import { sendOrderConfirmationEmail } from '@/lib/email';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await sendOrderConfirmationEmail(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return NextResponse.json(
      { error: 'Failed to send confirmation email' },
      { status: 500 }
    );
  }
}
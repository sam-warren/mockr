import { NextRequest, NextResponse } from 'next/server';
import { stripe, handleWebhookEvent } from '@/lib/stripe';
import { headers } from 'next/headers';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (error: any) {
    console.error(`Webhook signature verification failed: ${error.message}`);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  try {
    // Process the event
    await handleWebhookEvent(event);
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error(`Webhook handler failed: ${error.message}`);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
} 
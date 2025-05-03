import express from 'express';
import { Webhook } from 'svix';
import prisma from "../lib/db.js";
const router = express.Router();

router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  try {
    console.log('Webhook received at:', new Date().toISOString());

    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('Missing CLERK_WEBHOOK_SECRET environment variable');
      return res.status(500).json({ message: 'Webhook secret not configured' });
    }

    // Get the Svix headers for verification
    const svixId = req.headers['svix-id'];
    const svixTimestamp = req.headers['svix-timestamp'];
    const svixSignature = req.headers['svix-signature'];

    if (!svixId || !svixTimestamp || !svixSignature) {
      console.error('Missing Svix headers', { svixId, svixTimestamp, svixSignature });
      return res.status(400).json({ message: 'Missing required Svix headers' });
    }

    // Convert the request body to a string if it's not already
    const payloadString = req.body.toString('utf8');

    // Create the Svix headers object for verification
    const svixHeaders = {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature
    };

    // Verify the webhook
    const svix = new Webhook(webhookSecret);
    let event;

    try {
      event = svix.verify(payloadString, svixHeaders);
    } catch (verifyError) {
      console.error('Webhook verification failed:', verifyError);
      return res.status(401).json({ message: 'Invalid webhook signature' });
    }

    // Log the event data
    console.log('Event type:', event.type);

    // Process user.created event
    if (event.type === 'user.created') {
      const { id, email_addresses, first_name, last_name } = event.data;

      if (!email_addresses || !email_addresses.length) {
        console.error('No email addresses found for user:', id);
        return res.status(400).json({ message: 'No email found for user' });
      }

      const primaryEmail = email_addresses[0].email_address;

      try {
        const newUser = await prisma.user.create({
          data: {
            clerkId: id,
            email: primaryEmail,
            name: `${first_name || ''} ${last_name || ''}`.trim() || 'Anonymous'
          }
        });

        console.log('User created successfully in database:', newUser.id);
        return res.status(201).json({ message: 'User created successfully' });
      } catch (dbError) {
        console.error('Database error creating user:', dbError);
        return res.status(500).json({
          message: 'Database error creating user',
          error: dbError.message
        });
      }
    }

    // For other event types, just acknowledge receipt
    return res.status(200).json({ message: 'Webhook received' });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(500).json({
      message: 'Webhook processing failed',
      error: error.message
    });
  }
});

export default router;

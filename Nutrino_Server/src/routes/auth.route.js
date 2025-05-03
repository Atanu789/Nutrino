import express from 'express';
import prisma from "../lib/db.js";
import { Webhook } from 'svix';
const router = express.Router();


router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
    try {

        console.log('Webhook headers:', req.headers);

        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
        if (!webhookSecret) {
            console.error('Missing CLERK_WEBHOOK_SECRET environment variable');
            throw new Error('Please add CLERK_WEBHOOK_SECRET to your environment variables');
        }

        console.log('Webhook secret first 4 chars:', webhookSecret.substring(0, 4));


        const svix = new Webhook(webhookSecret);
        const payload = req.body;
        const headers = req.headers;


        const svixSignature = headers['svix-signature'];
        if (!svixSignature) {
            return res.status(400).json({ message: 'Missing svix signature' });
        }

        const body = JSON.stringify(payload);
        const event = svix.verify(body, headers);

        const { type, data } = event;


        if (type === 'user.created') {
            const { id, email_addresses, first_name, last_name } = data;

            const primaryEmail = email_addresses[0]?.email_address;

            if (!primaryEmail) {
                return res.status(400).json({ message: 'No email found for user' });
            }


            await prisma.user.create({
                data: {
                    clerkId: id,
                    email: primaryEmail,
                    name: `${first_name || ''} ${last_name || ''}`.trim() || 'Anonymous'
                }
            });

            return res.status(201).json({ message: 'User created successfully' });
        }
        return res.status(200).json({ message: 'Webhook received' });
    } catch (error) {
        console.error('Webhook error:', error);
        return res.status(500).json({ message: 'Webhook processing failed' });
    }
});

export default router;
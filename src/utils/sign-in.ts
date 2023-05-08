import bcrypt from 'bcrypt';
import { ExpressValidator } from 'express-validator';
import { Password } from '../interfaces/compare-password.interface';
import { Status, VerificationStatus } from '../interfaces';
import { VerificationToken } from '../interfaces/verification-token.interface';
import prisma from '../db';

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const { body } = new ExpressValidator({
	userIsValid: async (email: string) => {
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return Promise.reject('Invalid email or password');
		}
	},
});

export const compare = async ({ password, with: hashedPassword }: Password): Promise<boolean> => {
	return await bcrypt.compare(password, hashedPassword);
};

export const validateEmail = body('email').userIsValid();

export const sendVerificationToken = async ({ to: phoneNumber }: VerificationToken): Promise<Status> => {
	const verification: VerificationStatus = await client.verify.v2
		.services(process.env.TWILIO_SERVICE_SID)
		.verifications.create({ to: phoneNumber, channel: 'sms' });

	return verification.status;
};

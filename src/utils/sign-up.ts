import bcrypt from 'bcrypt';
import prisma from '../db';
import { body } from 'express-validator';
import { isValidUser } from './user-validator';
import type { User } from '@prisma/client';
import { User as UserParameters } from '../interfaces/user.interface';
import { VerificationEmail } from '../interfaces/verification-email.interface';

const client = require('twilio')(
	process.env.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN
);

export const createUser = async ({
	with: email,
	and: password,
}: UserParameters): Promise<User> => {
	const user = await prisma.user.create({
		data: {
			email,
			password: await hashPassword(password),
		},
	});

	return user;
};

export const hashPassword = async (password: string): Promise<string> => {
	return await bcrypt.hash(password, 10);
};

export const sendVerificationCode = async ({
	to: email,
}: VerificationEmail) => {
	await client.verify.v2
		.services(process.env.TWILIO_SERVICE_SID)
		.verifications.create({ to: email, channel: 'email' });
};

export const validateEmail = body('email')
	.isEmail()
	.withMessage('Email must be valid')
	.custom(isValidUser);

export const validatePassword = body('password')
	.trim()
	.isLength({ min: 8, max: 16 })
	.withMessage(
		'Password must be at least 8 characters and at most 16 characters'
	)
	.matches(/[a-z]+/)
	.withMessage('Password must have at least one lowercase character')
	.matches(/[A-Z]+/)
	.withMessage('Password must have at least one uppercase character')
	.matches(/[@$!%*#?&]+/)
	.withMessage('Password must have at least one special character')
	.matches(/\d+/)
	.withMessage('Password must have at least one number');

import bcrypt from 'bcrypt';
import { ExpressValidator } from 'express-validator';
import { JSONWebToken, VerificationEmail, User as UserParameters } from '../interfaces';
import * as jwt from 'jsonwebtoken';
import prisma from '../db';

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const { body } = new ExpressValidator({
	userIsValid: async (email: string) => {
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (user) {
			return Promise.reject(`User with email ${email} already exist`);
		}
	},
});

export const createUser = async ({ with: email, and: password }: UserParameters) => {
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

export const sendVerificationCode = async ({ to: email }: VerificationEmail) => {
	await client.verify.v2.services(process.env.TWILIO_SERVICE_SID).verifications.create({ to: email, channel: 'email' });
};

export const signJWT = ({ with: id }: JSONWebToken): string => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 300 });
};

export const verifyJWT = ({ with: payload }: JSONWebToken): string | jwt.JwtPayload => {
	return jwt.verify(payload, process.env.JWT_SECRET);
};

export const validateEmail = body('email').isEmail().withMessage('Email must be valid').userIsValid();

export const validatePassword = body('password')
	.trim()
	.isLength({ min: 8, max: 16 })
	.withMessage('Password must be at least 8 characters and at most 16 characters')
	.matches(/[a-z]+/)
	.withMessage('Password must have at least one lowercase character')
	.matches(/[A-Z]+/)
	.withMessage('Password must have at least one uppercase character')
	.matches(/[@$!%*#?&]+/)
	.withMessage('Password must have at least one special character')
	.matches(/\d+/)
	.withMessage('Password must have at least one number');

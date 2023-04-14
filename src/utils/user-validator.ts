import { CustomValidator } from 'express-validator';
import prisma from '../db';

export const isValidUser: CustomValidator = async email => {
	const user = await prisma.user.findUnique({
		where: { email },
	});

	if (user) {
		return Promise.reject(`User with email ${email} already exist`);
	}
};

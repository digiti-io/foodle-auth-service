import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Profile } from '@prisma/client';
import { compare, sendVerificationToken } from '../../utils/sign-in';
import { AuthError, NotFoundError, ValidationError } from '../../models/auth-service-errors';
import {
	AuthServiceDataPayload,
	AuthServiceMetaPayload,
	AuthServiceResponsePayload,
	AuthServiceUserTokenPayload,
} from '../../models/auth-service-payload';
import prisma from '../../db';

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return next(new ValidationError(errors.array()));
	}

	const { email, password } = req.body;

	const user = await prisma.user.findUnique({
		where: { email },
	});

	const passwordIsValid = await compare({ password, with: user.password });

	if (!passwordIsValid) {
		return next(
			new AuthError({
				message: 'Invalid email or password',
			})
		);
	}

	const profile: Profile | null = await prisma.profile.findUnique({
		where: { userId: user?.id },
	});

	if (!profile) {
		return next(
			new NotFoundError({
				message: 'Profile must be provided by the user',
			})
		);
	}

	const verificationCode = await sendVerificationToken({
		to: profile?.phoneNumber,
	});

	const { password: userPassword, ...userData } = user;

	const auth = new AuthServiceUserTokenPayload(userData, null);

	const meta = new AuthServiceMetaPayload(`Verification token sent to ${profile?.phoneNumber}`);
	const data = new AuthServiceDataPayload(auth);

	const response = new AuthServiceResponsePayload(meta, data);

	res.status(200).send(response);
};

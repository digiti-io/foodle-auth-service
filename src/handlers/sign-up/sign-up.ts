import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ValidationError } from '../../models/auth-service-errors/validation-error';
import { createUser, sendVerificationCode } from '../../utils/sign-up';

export const signUp = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return next(new ValidationError(errors.array()));
	}

	const { email, password } = req.body;

	const user = await createUser({ with: email, and: password });

	if (user) {
		await sendVerificationCode({ to: email });
	}

	res.status(201).send({
		success: true,
		message: 'User created successfully',
		errors: [],
		data: {
			auth: {
				token: null,
				user,
			},
		},
	});
};

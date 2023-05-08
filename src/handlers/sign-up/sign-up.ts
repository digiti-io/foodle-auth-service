import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ValidationError } from '../../models/auth-service-errors/validation-error';
import { createUser, sendVerificationCode, signJWT } from '../../utils/sign-up';
import { AuthServiceUserTokenPayload } from '../../models/auth-service-payload/auth-service-user-token-payload.model';
import {
	AuthServiceDataPayload,
	AuthServiceMetaPayload,
	AuthServiceResponsePayload,
} from '../../models/auth-service-payload';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return next(new ValidationError(errors.array()));
	}

	const { email, password } = req.body;

	const user = await createUser({ with: email, and: password });

	const token = signJWT({ with: user.id });

	const verificationCode = await sendVerificationCode({ to: email });

	const { password: userPassword, ...userData } = user;

	const auth = new AuthServiceUserTokenPayload(userData, token);

	const meta = new AuthServiceMetaPayload('User created successfully');
	const data = new AuthServiceDataPayload(auth);

	const response = new AuthServiceResponsePayload(meta, data);

	res.status(201).send(response);
};

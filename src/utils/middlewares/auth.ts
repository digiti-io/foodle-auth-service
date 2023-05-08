import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { verifyJWT } from '../sign-up';
import {
	AuthServiceDataPayload,
	AuthServiceMetaPayload,
	AuthServiceResponsePayload,
} from '../../models/auth-service-payload';
import { NotAuthorized } from '../../models/auth-service-errors';

export const decodeAuthHeader = (req: Request, res: Response, next: NextFunction) => {
	const bearer = req.headers.authorization;

	if (!bearer) {
		const { error } = new NotAuthorized({
			message: 'Bearer token not provided',
		});

		const meta = new AuthServiceMetaPayload('Not authorized', false, [error]);

		const data = new AuthServiceDataPayload(null);

		const response = new AuthServiceResponsePayload(meta, data);

		return res.status(401).send(response);
	}

	const token = req.headers.authorization.replace('Bearer ', '');

	try {
		const payload = verifyJWT({ with: token }) as JwtPayload;

		req.user = payload;

		return next();
	} catch (err: any) {
		const errorMessage = err.message[0].toUpperCase() + err.message.slice(1);

		const meta = new AuthServiceMetaPayload('Not authorized', false, [{ message: errorMessage }]);

		const data = new AuthServiceDataPayload(null);

		const response = new AuthServiceResponsePayload(meta, data);

		return res.status(401).send(response);
	}
};

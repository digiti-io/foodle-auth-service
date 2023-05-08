import { Request, Response, NextFunction } from 'express';
import { AuthServiceError } from '../../models/auth-service-errors/auth-service-error';
import {
	AuthServiceDataPayload,
	AuthServiceMetaPayload,
	AuthServiceResponsePayload,
} from '../../models/auth-service-payload';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof AuthServiceError) {
		const { errors, message, status } = err;

		const meta = new AuthServiceMetaPayload(message, false, errors);
		const data = new AuthServiceDataPayload(null);

		const response = new AuthServiceResponsePayload(meta, data);

		return res.status(status).send(response);
	}
};

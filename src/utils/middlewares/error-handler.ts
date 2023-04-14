import { Request, Response, NextFunction } from 'express';
import { AuthServiceError } from '../../models/auth-service-errors/auth-service-error';

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof AuthServiceError) {
		const { errors, message, status } = err;

		return res.status(status).send({
			success: false,
			message,
			errors,
			data: {},
		});
	}
};

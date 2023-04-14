import { ValidationError as ExpressValidationError } from 'express-validator';
import { AuthServiceError } from './auth-service-error';

export class ValidationError extends AuthServiceError {
	status = 400;

	errors = this.validationErrors.map(err => {
		return { field: err.param, message: err.msg };
	});

	constructor(public validationErrors: ExpressValidationError[]) {
		super('Invalid request parameters');
		Object.setPrototypeOf(this, ValidationError.prototype);
	}
}

import { AuthServiceError } from './auth-service-error';

export class NotFoundError extends AuthServiceError {
	status = 404;

	errors = [{ message: this.error.message }];

	constructor(public error: { message: string }) {
		super('Not found');
		Object.setPrototypeOf(this, NotFoundError.prototype);
	}
}

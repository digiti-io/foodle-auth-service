import { AuthServiceError } from './auth-service-error';

export class NotAuthorized extends AuthServiceError {
	status = 401;

	errors = [{ message: this.error.message }];

	constructor(public error: { message: string }) {
		super('Not authorized');
		Object.setPrototypeOf(this, NotAuthorized.prototype);
	}
}

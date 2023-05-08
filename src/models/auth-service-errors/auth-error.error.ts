import { AuthErrorInterface } from '../../interfaces';
import { AuthServiceError } from './auth-service-error';

export class AuthError extends AuthServiceError {
	status = 401;

	errors = [{ message: this.authError.message }];

	constructor(public authError: AuthErrorInterface) {
		super('Wrong credentials');
		Object.setPrototypeOf(this, AuthError.prototype);
	}
}

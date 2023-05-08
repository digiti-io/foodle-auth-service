import { User } from '../user.model';

export class AuthServiceUserTokenPayload {
	constructor(public user: User, public token: string | null) {
		Object.setPrototypeOf(this, AuthServiceUserTokenPayload.prototype);
	}
}

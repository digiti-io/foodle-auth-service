import { AuthServiceProfilePayload, AuthServiceUserTokenPayload } from '.';

export class AuthServiceDataPayload {
	constructor(public auth: AuthServiceUserTokenPayload | AuthServiceProfilePayload) {
		Object.setPrototypeOf(this, AuthServiceDataPayload.prototype);
	}
}

import { Profile } from '../profile.model';

export class AuthServiceProfilePayload {
	constructor(public profile: Profile) {
		Object.setPrototypeOf(this, AuthServiceProfilePayload.prototype);
	}
}

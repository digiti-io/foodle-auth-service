import { AuthServiceDataPayload, AuthServiceMetaPayload } from '.';

export class AuthServiceResponsePayload {
	constructor(public meta: AuthServiceMetaPayload, public data: AuthServiceDataPayload) {
		Object.setPrototypeOf(this, AuthServiceResponsePayload.prototype);
	}
}

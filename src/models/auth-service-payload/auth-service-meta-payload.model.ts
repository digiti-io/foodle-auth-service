export class AuthServiceMetaPayload {
	constructor(public message: string, public success: boolean = true, public errors: any = []) {
		Object.setPrototypeOf(this, AuthServiceMetaPayload.prototype);
	}
}

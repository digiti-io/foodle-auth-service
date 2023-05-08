export abstract class AuthServiceError extends Error {
	abstract status: number;
	abstract errors: any;

	constructor(message: string) {
		super(message);

		Object.setPrototypeOf(this, AuthServiceError.prototype);
	}
}

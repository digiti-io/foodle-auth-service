export abstract class AuthServiceError extends Error {
	abstract status: number;
	abstract errors: { message: string; field?: string }[];

	constructor(message: string) {
		super(message);

		Object.setPrototypeOf(this, AuthServiceError.prototype);
	}
}

export class Profile {
	constructor(
		public id: string,
		public address: string,
		public firstName: string,
		public lastName: string,
		public phoneNumber: string,
		public createdAt: Date,
		public updatedAt: Date
	) {
		Object.setPrototypeOf(this, Profile.prototype);
	}
}

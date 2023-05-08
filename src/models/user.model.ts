import { Role, Status } from '@prisma/client';
import { Profile } from './profile.model';

export class User {
	constructor(
		public id: string,
		public email: string,
		public role: Role,
		public status: Status,
		public createdAt: Date,
		public updatedAt: Date,
		public profile?: Profile
	) {
		Object.setPrototypeOf(this, User.prototype);
	}
}

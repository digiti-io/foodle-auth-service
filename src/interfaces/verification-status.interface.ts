import { Status } from './status.interface';

export interface VerificationStatus {
	status: Status.Pending | Status.Approved;
}

import { NextFunction, Request, Response } from 'express';
import prisma from '../../db';
import {
	AuthServiceDataPayload,
	AuthServiceMetaPayload,
	AuthServiceProfilePayload,
	AuthServiceResponsePayload,
} from '../../models/auth-service-payload';

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
	const { address, firstName, lastName, phoneNumber } = req.body;

	const profile = await prisma.profile.upsert({
		create: {
			userId: req.user.id,
			address,
			firstName,
			lastName,
			phoneNumber,
		},
		update: {
			address,
			firstName,
			lastName,
			phoneNumber,
		},
		where: {
			userId: req.user.id,
		},
	});

	const { userId, ...userProfile } = profile;

	const profilePayload = new AuthServiceProfilePayload(userProfile);

	const meta = new AuthServiceMetaPayload('Profile updated successfully');
	const data = new AuthServiceDataPayload(profilePayload);

	const response = new AuthServiceResponsePayload(meta, data);

	res.status(201).send(response);
};

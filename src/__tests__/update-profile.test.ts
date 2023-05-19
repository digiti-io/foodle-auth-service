import request from 'supertest';
import { expect } from '@jest/globals';
import { app } from '../app';
import { User } from '../utils/tests';
import prisma from '../db';

let token: string;

beforeAll(async () => {
	const res = await request(app)
		.post('/api/v1/auth/sign-up')
		.send({ email: 'test.user09@digiti.io', password: '1m6ytYW3&6J!' });

	token = res.body.data.auth.token;
});

afterAll(async () => {
	await prisma.profile.deleteMany();
});

describe('/api/v1/auth/update-profile', () => {
	it('should update user profile', async () => {
		const res = await request(app).post('/api/v1/user/update-profile').set('Authorization', `Bearer ${token}`).send({
			address: User.address,
			firstName: User.firstName,
			lastName: User.lastName,
			phoneNumber: process.env.PHONE_NUMBER,
		});

		expect(res.body.meta.message).toBe('Profile updated successfully');
	});

	it('should not update user profile without logging in', async () => {
		const res = await request(app).post('/api/v1/user/update-profile').send({
			address: User.address,
			firstName: User.firstName,
			lastName: User.lastName,
			phoneNumber: process.env.PHONE_NUMBER,
		});

		expect(res.status).toBe(401);
		expect(res.body.meta.message).toBe('Not authorized');
	});
});

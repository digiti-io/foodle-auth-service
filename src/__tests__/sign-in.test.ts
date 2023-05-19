import request from 'supertest';
import { expect } from '@jest/globals';
import { createUserAndUpdateProfile } from '../utils/tests';
import { app } from '../app';

beforeAll(() => createUserAndUpdateProfile());

describe('/api/v1/auth/sign-in', () => {
	it('should send user verification code if credentials are valid', async () => {
		const res = await request(app)
			.post('/api/v1/auth/sign-in')
			.send({ email: 'test.user10@digiti.io', password: '1m6ytYW3&6J!' });

		expect(res.status).toBe(200);
	});

	it('should not send user verification code if profile was not provided', async () => {
		await request(app).post('/api/v1/auth/sign-up').send({ email: 'test.user11@digiti.io', password: '1m6ytYW3&6J!' });

		const res = await request(app)
			.post('/api/v1/auth/sign-in')
			.send({ email: 'test.user11@digiti.io', password: '1m6ytYW3&6J!' });

		expect(res.status).toBe(404);

		for (let error of res.body.meta.errors) {
			expect(error.message).toBe('Profile must be provided by the user');
		}
	});
});

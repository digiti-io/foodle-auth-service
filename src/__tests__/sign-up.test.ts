import request from 'supertest';
import { app } from '../app';
import { Role, Status } from '@prisma/client';
import { expect } from '@jest/globals';

describe('/api/v1/auth/sign-up', () => {
	it('should create a new user', async () => {
		const res = await request(app)
			.post('/api/v1/auth/sign-up')
			.send({ email: 'test.user01@digiti.io', password: '1m6ytYW3&6J!' });

		expect(res.status).toBe(201);
	});

	it("should create a new user with status equal to 'PENDING'", async () => {
		const res = await request(app)
			.post('/api/v1/auth/sign-up')
			.send({ email: 'test.user02@digiti.io', password: '1m6ytYW3&6J!' });

		expect(res.body.data.auth.user.status).toBe(Status.PENDING);
	});

	it("should create a new user with role equal to 'USER'", async () => {
		const res = await request(app)
			.post('/api/v1/auth/sign-up')
			.send({ email: 'test.user03@digiti.io', password: '1m6ytYW3&6J!' });

		expect(res.body.data.auth.user.role).toBe(Role.USER);
	});

	it('should not create a user with an existing email', async () => {
		await request(app).post('/api/v1/auth/sign-up').send({
			email: 'test.user04@digiti.io',
			password: '1m6ytYW3&6J!',
		});

		const res = await request(app).post('/api/v1/auth/sign-up').send({
			email: 'test.user04@digiti.io',
			password: '1m6ytYW3&6J!',
		});

		expect(res.body.meta.success).toBe(false);
	});

	it('should not create a user if password is not at least 8 characters and at most 16 characters long', async () => {
		const res = await request(app)
			.post('/api/v1/auth/sign-up')
			.send({ email: 'test.user05@digiti.io', password: 'ytYW3&' });

		for (let error of res.body.meta.errors) {
			expect(error.message).toBe('Password must be at least 8 characters and at most 16 characters');
		}
	});

	it('should not create a user if password does not have at least one lowercase character', async () => {
		const res = await request(app)
			.post('/api/v1/auth/sign-up')
			.send({ email: 'test.user05@digiti.io', password: '1M6YTYW3&6J!' });

		for (let error of res.body.meta.errors) {
			expect(error.message).toBe('Password must have at least one lowercase character');
		}
	});

	it('should not create a user if password does not have at least one uppercase character', async () => {
		const res = await request(app)
			.post('/api/v1/auth/sign-up')
			.send({ email: 'test.user06@digiti.io', password: '1m6ytyw3&6j!' });

		for (let error of res.body.meta.errors) {
			expect(error.message).toBe('Password must have at least one uppercase character');
		}
	});

	it('should not create a user if password does not have at least one special character', async () => {
		const res = await request(app)
			.post('/api/v1/auth/sign-up')
			.send({ email: 'test.user07@digiti.io', password: '1m6ytYW36J!' });

		for (let error of res.body.meta.errors) {
			expect(error.message).toBe('Password must have at least one special character');
		}
	});

	it('should not create a user if password does not have at least one number', async () => {
		const res = await request(app)
			.post('/api/v1/auth/sign-up')
			.send({ email: 'test.user08@digiti.io', password: 'mytYW&J!' });

		for (let error of res.body.meta.errors) {
			expect(error.message).toBe('Password must have at least one number');
		}
	});
});

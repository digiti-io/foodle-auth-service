import request from 'supertest';
import { app } from '../../app';
import { faker } from '@faker-js/faker';

export const createUserAndUpdateProfile = async (): Promise<void> => {
	const res = await request(app)
		.post('/api/v1/auth/sign-up')
		.send({ email: 'test.user10@digiti.io', password: '1m6ytYW3&6J!' });

	const updateProfile = await request(app)
		.post('/api/v1/user/update-profile')
		.set('Authorization', `Bearer ${res.body.data.auth.token}`)
		.send({
			address: User.address,
			firstName: User.firstName,
			lastName: User.lastName,
			phoneNumber: process.env.PHONE_NUMBER,
		});
};

export const User = {
	address:
		faker.address.streetAddress(true) +
		', ' +
		faker.address.cityName() +
		', ' +
		faker.address.stateAbbr() +
		' ' +
		faker.address.zipCode() +
		' ' +
		faker.address.countryCode(),
	firstName: faker.name.firstName(),
	lastName: faker.name.lastName(),
};

export const Auth = {
	email: faker.internet.email(User.firstName.toLowerCase(), User.lastName.toLowerCase(), '@digiti.io', {
		allowSpecialCharacters: false,
	}),
	password: faker.internet.password(8, true, /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/),
};

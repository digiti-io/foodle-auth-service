import prisma from '../../db';

afterAll(async () => {
	await prisma.user.deleteMany();
	await prisma.profile.deleteMany();
});

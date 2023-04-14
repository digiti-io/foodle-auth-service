import prisma from '../../db';

beforeEach(async () => {
	await prisma.user.deleteMany();
});

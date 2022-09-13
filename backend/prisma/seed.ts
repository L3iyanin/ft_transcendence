// prisma/seed.ts

import { PrismaClient } from "@prisma/client";

// initialize Prisma Client
const prisma = new PrismaClient();

async function addAchivements() {
	const achivement0 = await prisma.achievement.create({
		data: {
			name: "achivement0",
			description: "achivement0 desc",
			imgUrl: "/home/image0.jpg",
		},
	});
	const achivement1 = await prisma.achievement.create({
		data: {
			name: "achivement1",
			description: "achivement1 desc",
			imgUrl: "/home/image1.jpg",
		},
	});
	console.log({ achivement0, achivement1 });
}

async function addUsers() {
	const user0 = await prisma.user.create({
		data: {
			username: "user0",
			fullName: "fdfdff",
			imgUrl: "/path/image/profile",
			login: "user0",
		},
	});
	const user1 = await prisma.user.create({
		data: {
			username: "user1",
			fullName: "cdcdcd",
			imgUrl: "/path/image/profile",
			login: "user1",
		},
	});
	const user2 = await prisma.user.create({
		data: {
			username: "user2",
			fullName: "fdfdfd",
			imgUrl: "/path/image/profile",
			login: "user2",
		},
	});
	console.log({ user0, user1, user2 });
}

async function main() {
	await addAchivements();
	await addUsers();
}

// execute the main function
main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		// close Prisma Client at the end
		await prisma.$disconnect();
	});

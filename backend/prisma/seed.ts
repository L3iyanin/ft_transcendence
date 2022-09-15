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
	const achivement2 = await prisma.achievement.create({
		data: {
			name: "achivement2",
			description: "achivement2 desc",
			imgUrl: "/home/image2.jpg",
		},
	});
	const achivement3 = await prisma.achievement.create({
		data: {
			name: "achivement3",
			description: "achivement3 desc",
			imgUrl: "/home/image3.jpg",
		},
	});
	console.table({ achivement0, achivement1 , achivement2, achivement3});
}

async function addUsers() {
	const user0 = await prisma.user.create({
		data: {
			username: "user0",
			fullName: "fdfdff",
			imgUrl: "/path/image/profile0",
			login: "user0",
		},
	});
	const user1 = await prisma.user.create({
		data: {
			username: "user1",
			fullName: "cdcdcd",
			imgUrl: "/path/image/profile1",
			login: "user1",
		},
	});
	const user2 = await prisma.user.create({
		data: {
			username: "user2",
			fullName: "fdfdfd",
			imgUrl: "/path/image/profile2",
			login: "user2",
		},
	});
	console.log({ user0, user1, user2 });
}

async function addAchivementsToUser(userId : number){
	try {
		const  userUpdated = await prisma.user.update(
			{
				where : {id : userId},
				data : {
					achievements : {
						connect : [{id : 9}, {id : 10}]
					}
				}
			}
		)
		console.table(userUpdated)
	}
	catch(exception){
		console.log(exception)
	}
}

async function addAFriendsToUser(userId : number){
	try {
		const  userUpdated = await prisma.user.update(
			{
				where : {id : userId},
				data : {
					friends : {
						connect : [{id : 5}, {id : 4},  {id : 3}]
					}
				}
			}
		)
		console.table(userUpdated)
	}
	catch(exception){
		console.log(exception)
	}
}

async function main() {
	// await addAchivements();
	// await addUsers();
	// await addAchivementsToUser(2)
	await addAFriendsToUser(2)
}
main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		// close Prisma Client at the end
		await prisma.$disconnect();
	});

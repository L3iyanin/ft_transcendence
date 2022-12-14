// prisma/seed.ts

import { PrismaClient } from "@prisma/client";

import { faker } from '@faker-js/faker';
import { CreateChannelDto } from "src/chat/dto/chat.dto";
import { HttpException } from "@nestjs/common";


// initialize Prisma Client
const prisma = new PrismaClient();

async function addAchivements() {
	const achivement0 = await prisma.achievement.create({
		data: {
			name: "Win first played Match",
			description: "Mera Mera No Mi",
			imgUrl: `${process.env.BACKEND_URL}/statics/achivements/achivement1.png`,
			achivementId: 1,
		},
	});
	const achivement1 = await prisma.achievement.create({
		data: {
			name: "Win 2 Match in row",
			description: "Ope Ope No Mi",
			imgUrl: `${process.env.BACKEND_URL}/statics/achivements/achivement2.png`,
			achivementId: 2,
		},
	});
	const achivement2 = await prisma.achievement.create({
		data: {
			name: "you Lose versus khalid ",
			description: "Poneglyph",
			imgUrl: `${process.env.BACKEND_URL}/statics/achivements/achivement3.png`,
			achivementId: 3,
		},
	});
	const achivement3 = await prisma.achievement.create({
		data: {
			name: "Win with clean sheet",
			description: "Ito Ito No Mi",
			imgUrl: `${process.env.BACKEND_URL}/statics/achivements/achivement4.png`,
			achivementId: 4,
		},
	});
	const achivement4 = await prisma.achievement.create({
		data: {
			name: "Win 5 Match in row",
			description: "King Of Pirates",
			imgUrl: `${process.env.BACKEND_URL}/statics/achivements/achivement5.png`,
			achivementId: 5,
		},
	});
	console.table({ achivement0, achivement1 , achivement2, achivement3, achivement4});
}

async function addUsers(howManyUsers : number = 10) {

	for (let i = 0; i < howManyUsers; i++) {
		const username = faker.internet.userName();
		const user = await prisma.user.create({
			data: {
				username: username,
				fullName: faker.name.fullName(),
				imgUrl: faker.image.avatar(),
				login: username,
				email: faker.internet.email(),
			},
		});
	}
}

async function addAchivementsToUser(userId : number){
	try {
		const  userUpdated = await prisma.user.update(
			{
				where : {id : userId},
				data : {
					achievements : {
						connect : [{id : 1}, {id : 2}]
					}
				}
			}
		)
		console.table(userUpdated)
	}
	catch(err){
		throw new HttpException(err.message, err.status);

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
	catch(err){
		throw new HttpException(err.message, err.status);

	}
}

async function CreateChannelDm(user1 : number, user2 : number){
	const channelName = user1.toString() + '_' +  user2.toString()
	const newChannel = await prisma.channel.create({
		data: {
			name: channelName,
			imgUrl: `https://myanimelist.tech/api/avatar?name=${channelName}&animeName=One_Piece`, // @ To be generated
			members: {
				create: [
					{
						user: {
							connect: {
								id: user1,
							},
						},
						role: "MEMBER",
						status: "NONE",
					},
					{
						user: {
							connect: {
								id: user2,
							},
						},
						role: "MEMBER",
						status: "NONE",
					},
				],
			},
			type: "DM",
		},
	});
}

async function CreateChannelGroup(user1 : number, user2 : number, user3 : number){
	const channelName = "l3iyanin"
	const newChannel = await prisma.channel.create({
		data: {
			name: channelName,
			imgUrl: `https://myanimelist.tech/api/avatar?name=${channelName}&animeName=One_Piece`, // @ To be generated
			members: {
				create: [
					{
						user: {
							connect: {
								id: user1,
							},
						},
						role: "ADMIN",
						status: "NONE",
					},
					{
						user: {
							connect: {
								id: user2,
							},
						},
						role: "MEMBER",
						status: "NONE",
					},
					{
						user: {
							connect: {
								id: user3,
							},
						},
						role: "MEMBER",
						status: "NONE",
					},
				],
			},
			type: "PUBLIC",
		},
	});
}
async function main() {
	await addAchivements();
	// await addUsers();
	// await addAchivementsToUser(1)
	// await addAFriendsToUser(2)
	// await CreateChannelDm(5, 6)
	// await CreateChannelGroup(5, 6, 7)
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

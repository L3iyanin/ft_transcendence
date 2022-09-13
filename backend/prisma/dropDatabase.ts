import { PrismaClient } from "@prisma/client";

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
	const user = await prisma.user.deleteMany();
	const achievement = await prisma.achievement.deleteMany();
	const match = await prisma.match.deleteMany();
	const channel = await prisma.channel.deleteMany();
	const member = await prisma.member.deleteMany();
	const message = await prisma.message.deleteMany();
	console.log({ user, achievement, match, channel, member, message });
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

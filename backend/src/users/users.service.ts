import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { UserProfile } from "./user.interface";

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
	async getUserInfo(userId: number): Promise<UserProfile> {
		try {
			const user = await prisma.user.findUnique({
				where: {
					id: userId,
				},
				include: {
					achievements: true,
					friends: true,
				},
			});
			const userProfile: UserProfile = {
				numberOfFreind: user.friends.length,
				numberOfachivements: user.achievements.length,
				...user,
			};
			return userProfile;
		} catch (exception) {
			//! return error
			console.log(exception);
			return undefined;
		}
	}
}

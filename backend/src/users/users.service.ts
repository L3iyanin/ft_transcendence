import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { Achievement } from "./dto/achievement.dto";
import { UserInfo } from "./dto/user.dto";

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
	async getUserInfo(userId: number): Promise<UserInfo> {
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
			if (!user) return undefined;
			const userInfo: UserInfo = {
				fullName: user.fullName,
				username: user.username,
				imgUrl: user.imgUrl,
				numberOfachivements: user.achievements.length,
				numberOfFreind: user.friends.length,
				loses: user.loses,
				wins: user.wins,
			};
			return userInfo;
		} catch (exception) {
			//! return error
			console.log(exception);
			return undefined;
		}
	}

	async getAllAchievements() {
		const achievements = await prisma.achievement.findMany();
		console.table(achievements);
		return achievements;
	}

	async getUserAchievements(userId: number) {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				achievements: true,
			},
		});
		return user.achievements;
	}

	async getAchievemnets(userId: number): Promise<Achievement[]> {
		try {
			const allAchievements = await this.getAllAchievements();
			const userAchivement = await this.getUserAchievements(userId);
			let achievements: Achievement[] = [];
			allAchievements.forEach((acheiv) => {
				if (userAchivement.some((userAchiev) => userAchiev.id == acheiv.id)) {
					achievements.push({
						...acheiv,
						achieved: true,
					});
				} else {
					achievements.push({
						...acheiv,
						achieved: false,
					});
				}
			});
			return achievements;
		} catch (exception) {
			console.log(exception);
			return;
		}
	}
}

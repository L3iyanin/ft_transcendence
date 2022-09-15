import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { Achievement } from "./dto/achievement.dto";
import { Leaderboard } from "./dto/leaderboard.dto";
import { UserInfo } from "./dto/userInfo.dto";

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
	async getUserInfoById(userId: number): Promise<UserInfo> {
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
			if (!user) 
				return undefined;
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
		} catch (err) {
			//! return error
			console.log(err);
			return undefined;
		}
	}

	async getLeaderboard(): Promise<Leaderboard[]> {
		try {
			const users = await prisma.user.findMany();
			let transformedUsers: Leaderboard[] = users.map((user) => {
				return {
					data: {
						WinsMinusLoses: user.wins - user.loses,
						rank: 1,
						...user
					},
				};
			});



			let leaderboard: Leaderboard[] = transformedUsers.sort((user1, user2) => {
				if (user1.data.WinsMinusLoses > user2.data.WinsMinusLoses) {
					return -1;
				}
			})

			leaderboard.forEach((user, index) => {
				user.data.rank = index + 1;
			})

			return leaderboard;
		} catch (err) {
			console.error(err);
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

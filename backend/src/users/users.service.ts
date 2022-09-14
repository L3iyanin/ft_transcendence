import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { Leaderboard } from "./dto/leaderboard.dto";
import { UserInfo } from "./dto/user-info.dto";

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
			const userInfo: UserInfo = {
				numberOfFreind: user.friends.length,
				numberOfachivements: user.achievements.length,
				...user,
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
}

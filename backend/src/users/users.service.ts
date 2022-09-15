import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { Achievement } from "./dto/achievement.dto";
import { Friend } from "./dto/friend.dto";
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
						...user,
					},
				};
			});
			let leaderboard: Leaderboard[] = transformedUsers.sort((user1, user2) => {
				if (user1.data.WinsMinusLoses > user2.data.WinsMinusLoses) {
					return -1;
				}
			});

			leaderboard.forEach((user, index) => {
				user.data.rank = index + 1;
			});

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

	async getUserFriends(userId: number): Promise<Friend[]> {
		try {
			const user = await prisma.user.findUnique({
				where: {
					id: userId,
				},
				select: {
					friends: true,
				},
			});
			console.log(user.friends);
			const friends: Friend[] = [];
			user.friends.map((friend) => {
				friends.push({
					fullName: friend.fullName,
					username: friend.username,
					imgUrl: friend.imgUrl,
					loses: friend.loses,
					wins: friend.wins,
				});
			});
			return friends;
		} catch (err) {
			//! return error
			console.log(err);
			return undefined;
		}
	}

	async sendFriendRequest(from: number, to: number) { //! you should check this tommorow
		try {
			let user = await prisma.user.findUnique({
				where: { id: to },
				select: {
					friendRequests: true,
					friends : true
				},
			});
			let alreadyExist = user.friendRequests.some((req) => req.id == from);
			if (alreadyExist)
				return new HttpException("Request already sent", HttpStatus.BAD_REQUEST);
			alreadyExist = user.friends.some((friend) => friend.id == from);
			if (alreadyExist)
				return new HttpException("They are already friend", HttpStatus.BAD_REQUEST);
			await prisma.user.update({
				where: {
					id: to,
				},
				data: {
					friendRequests: {
						connect: { id: from },
					},
				},
			});
			return new HttpException("Friend Request Has be sent", HttpStatus.CREATED);	
		}
		catch (err) {
			console.log(err);
			return new HttpException("INTERNAL SERVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async acceptFriendRequest(userId: number, friendId: number) {
		try {
			let user = await prisma.user.findUnique({
				where: { id: userId },
				select: {
					friendRequests: true,
				},
			});
			const friendRequestExist = user.friendRequests.some((req) => req.id == friendId);
			if (!friendRequestExist)
				return new HttpException("Friend Request dosnt exist", HttpStatus.BAD_REQUEST);
				const userUpdated = await prisma.user.update({
					where: { id: userId },
					data: {
						friendRequests: {
							disconnect: { id: friendId },
						},
						friends: {
							connect: { id: friendId },
						},
					},
				});
			return new HttpException("Friend Request Has be accepted", HttpStatus.CREATED);
		} 
		catch (err) {
			return new HttpException("INTERNAL SERVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}

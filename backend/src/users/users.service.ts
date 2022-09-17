import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { Achievement } from "./dto/achievement.dto";
import { Friend } from "./dto/friend.dto";
import { FriendRequest } from "./dto/friendRequest.dto";
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
					friendRequests : true
				},
			});
			if (!user)
				throw new HttpException("USER NOT FOUND", HttpStatus.BAD_REQUEST);
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
		} 
		catch (err) {
			console.error(err);
			throw new HttpException("INTERNAL SERVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
	
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
			throw new HttpException("INTERNAL SERVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getAllAchievements() {
		const achievements = await prisma.achievement.findMany();
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
			throw new HttpException("INTERNAL SERVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
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
		} 
		catch (err) {
			console.log(err);
			throw new HttpException("INTERNAL SERVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async sendFriendRequest(from: number, to: number) {
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
			return new HttpException("Friend Request Has ben sent", HttpStatus.CREATED);	
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
				await prisma.user.update({
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
				await prisma.user.update({
					where: { id: friendId },
					data: {
						friends: {
							connect: { id: userId },
						},
					},
				});
			return new HttpException("Friend Request Has be accepted", HttpStatus.CREATED);
		} 
		catch (err) {
			return new HttpException("INTERNAL SERVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	async discardFriendRequest(userId: number, friendId: number) {
		try {
			userId = 4
			let user = await prisma.user.findUnique({
				where: { id: userId },
				select: {
					friendRequests: true,
				},
			});
			const friendRequestExist = user.friendRequests.some((req) => req.id == friendId);
			if (!friendRequestExist)
				return new HttpException("Friend Request dosnt exist", HttpStatus.BAD_REQUEST);
				await prisma.user.update({
					where: { id: userId },
					data: {
						friendRequests: {
							disconnect: { id: friendId },
						},
					},
				});
			return new HttpException("FRIEND REQUEST HAS BEEN DISCARDED", HttpStatus.CREATED);
		}
		catch (err) {
			return new HttpException("INTERNAL SERVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	async getFriendRequests(userId: number): Promise<FriendRequest[]> {
		try {
			const user = await prisma.user.findUnique({
				where: {
					id: userId,
				},
				select: {
					friendRequests: true
				},
			});
			const friendRequests: FriendRequest[] = [];
			user.friendRequests.map((friend) => {
				friendRequests.push({
					userName : friend.username,
					friendId : friend.id,
					imgUrl :  friend.imgUrl
				});
			});
			return friendRequests;
		}
		catch (err) {
			console.log(err);
			throw new HttpException("INTERNAL SERVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}
}

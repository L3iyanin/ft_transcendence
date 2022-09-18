import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { Achievement } from "./dto/achievement.dto";
import { Friend } from "./dto/friend.dto";
import { FriendRequest } from "./dto/friendRequest.dto";
import { userInLeaderboard } from "./dto/userInLeaderboard";
import { UserInfo } from "./dto/userInfo.dto";
import multer from "multer";
import { extname, join } from "path";
import { PostResponce } from "./dto/postResponce.dto";

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
	async getUserInfoById(userId: number): Promise<UserInfo> {
		try {
			const user = await prisma.user.findUnique({
				where: {
					id: userId,
				},
				select: {
					id: true,
					username: true,
					fullName: true,
					imgUrl: true,
					wins: true,
					loses: true,
					achievements: {
						select: {
							id: true,
						},
					},
					friends: {
						select: {
							id: true,
						},
					},
				},
			});
			const userInfo: UserInfo = {
				id: user.id,
				username: user.username,
				fullName: user.fullName,
				imgUrl: user.imgUrl,
				wins: user.wins,
				loses: user.loses,
				numberOfAchievements: user.achievements.length,
				numberOfFriends: user.friends.length,
			};
			return userInfo;
		} catch (err) {
			console.error(err);
			throw new HttpException(err.response, err.status);
		}
	}

	async getLeaderboard(): Promise<userInLeaderboard[]> {
		try {
			const users = await prisma.user.findMany();
			let transformedUsers: userInLeaderboard[] = users.map((user) => {
				return {
					rank: 1,
					username: user.username,
					fullName: user.fullName,
					imgUrl: user.imgUrl,
					wins: user.wins,
					loses: user.loses,
					WinsMinusLoses: user.wins - user.loses,
				};
			});
			let leaderboard: userInLeaderboard[] = transformedUsers.sort((user1, user2) => {
				if (user1.WinsMinusLoses > user2.WinsMinusLoses) {
					return -1;
				}
			});

			leaderboard.forEach((user, index) => {
				user.rank = index + 1;
			});

			return leaderboard;
		} catch (err) {
			console.error(err);
			throw new HttpException(err.response, err.status);
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
			const userAchievements = await this.getUserAchievements(userId);
			let achievements: Achievement[] = [];
			allAchievements.forEach((Achievements) => {
				if (
					userAchievements.some(
						(userAchievement) => userAchievement.id == Achievements.id
					)
				) {
					achievements.push({
						...Achievements,
						achieved: true,
					});
				} else {
					achievements.push({
						...Achievements,
						achieved: false,
					});
				}
			});
			return achievements;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.response, err.status);
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
		} catch (err) {
			console.log(err);
			throw new HttpException(err.response, err.status);
		}
	}

	async sendFriendRequest(from: number, to: number): Promise<PostResponce> {
		try {
			let users = await prisma.user.findMany({
				where: {
					id: {
						in: [from, to],
					},
				},
				include: {
					friends: true,
					friendRequests: true,
				},
			});
			let toUser = users.find((user) => user.id == to);
			let fromUser = users.find((user) => user.id == from);

			if (
				toUser.friendRequests.some((request) => request.id == from) ||
				fromUser.friendRequests.some((request) => request.id == to)
			) {
				throw new HttpException("Friend request already sent", HttpStatus.BAD_REQUEST);
			}
			if (toUser.friends.some((friend) => friend.id == from)) {
				throw new HttpException("Users are already friends", HttpStatus.BAD_REQUEST);
			}

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
			return {
				message: "Friend request sent",
			};
		} catch (err) {
			console.log(err);
			throw new HttpException(err.response, err.status);
		}
	}

	async acceptFriendRequest(userId: number, friendId: number): Promise<PostResponce> {
		try {
			let user = await prisma.user.findUnique({
				where: { id: userId },
				select: {
					friendRequests: true,
				},
			});
			const friendRequestExist = user.friendRequests.some((req) => req.id == friendId);
			if (!friendRequestExist)
				throw new HttpException("Friend request doesn't exist", HttpStatus.BAD_REQUEST);
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
			return {
				message: "Friend request accepted",
			};
		} catch (err) {
			throw new HttpException(err.response, err.status);
		}
	}

	async discardFriendRequest(userId: number, friendId: number): Promise<PostResponce> {
		try {
			const user = await prisma.user.findUnique({
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
			return {
				message: "Friend request discarded",
			};
		} catch (err) {
			throw new HttpException(err.response, err.status);
		}
	}

	async getFriendRequests(userId: number): Promise<FriendRequest[]> {
		try {
			const user = await prisma.user.findUnique({
				where: {
					id: userId,
				},
				select: {
					friendRequests: true,
				},
			});
			const friendRequests: FriendRequest[] = [];
			user.friendRequests.map((friend) => {
				friendRequests.push({
					userName: friend.username,
					friendId: friend.id,
					imgUrl: friend.imgUrl,
				});
			});
			return friendRequests;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.response, err.status);
		}
	}

	async updateUserName(newUserName: string, userId: number): Promise<PostResponce> {
		try {
			await prisma.user.update({
				where: { id: userId },
				data: { username: newUserName },
			});
			return {
				message: "User name updated",
			};
		} catch (err) {
			console.log(err);
			throw new HttpException(err.response, err.status);
		}
	}

	async update2ff(userId: number): Promise<PostResponce> {
		return {
			message: "2ff is not yet implemented",
		};
	}

	async updateImageProfile(
		file: Express.Multer.File,
		userId: number,
		username: string
	): Promise<PostResponce> {
		try {
			const name = file.originalname.split(".")[0];
			const fileExtName = extname(file.originalname);
			const fileName = `/${name}-${username}${fileExtName}`;
			const filePath = join(process.env.BACKEND_URL, fileName);
			await prisma.user.update({
				where: { id: userId },
				data: { imgUrl: filePath },
			});
			return {
				message: "User avatar updated",
			};
		} catch (err) {
			console.log(err);
			throw new HttpException(err.response, err.status);
		}
	}
}

export function editFileName(req, file, callback) {
	const name = file.originalname.split(".")[0];
	const fileExtName = extname(file.originalname);
	callback(null, `${name}-${req.user.username}${fileExtName}`);
}

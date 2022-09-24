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
import { generateChannelName } from "src/chat/helpers";

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
	async getUserInfoById(userId: number, currentUserID: number): Promise<UserInfo> {
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

			let status: "NONE" | "BLOCKED" | "FRIEND" = "NONE";
			if (userId !== currentUserID) {
				// check if currentUserId is in user.friends
				const isFriend = user.friends.some((friend) => friend.id === currentUserID);
				if (isFriend) {
					status = "FRIEND";
				}
				// check if current user blocked user
				const channelName = generateChannelName(userId, currentUserID);
				const channel = await prisma.channel.findUnique({
					where: {
						name: channelName,
					},
					include: {
						members: true,
					},
				});
				if (channel) {
					console.log(channel);
					const userInChannel = channel.members.find((member) => member.userId === userId);
					console.log(userInChannel);
					if (userInChannel.status === "BLOCKED") {
						status = "BLOCKED";
					}
				}
			}

			const userInfo: UserInfo = {
				id: user.id,
				username: user.username,
				fullName: user.fullName,
				imgUrl: user.imgUrl,
				wins: user.wins,
				loses: user.loses,
				numberOfAchievements: user.achievements.length,
				numberOfFriends: user.friends.length,
				userStatus: status,
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
					id: friend.id,
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

	async addFriend(from: number, to: number): Promise<PostResponce> {
		try {
			const fromUser = await prisma.user.findUnique({
				where: {
					id: from,
				},
				select: {
					friends: true,
				},
			});
			const toUser = await prisma.user.findUnique({
				where: {
					id: to,
				},
				select: {
					friends: true,
				},
			});
			if (
				fromUser.friends.some((friend) => friend.id === to) ||
				toUser.friends.some((friend) => friend.id === from)
			) {
				throw new HttpException("User already friends", HttpStatus.BAD_REQUEST);
			}
			await prisma.user.update({
				where: {
					id: from,
				},
				data: {
					friends: {
						connect: {
							id: to,
						},
					},
				},
			});
			await prisma.user.update({
				where: {
					id: to,
				},
				data: {
					friends: {
						connect: {
							id: from,
						},
					},
				},
			});
			return {
				message: "Friend added successfully",
			};
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

	async updateImageProfile(file: Express.Multer.File, userId: number, username: string) {
		try {
			const name = file.originalname.split(".")[0];
			const fileExtName = extname(file.originalname);
			const fileName = `/${name}-${username}${fileExtName}`;
			const filePath = process.env.BACKEND_URL +  fileName
			await prisma.user.update({
				where: { id: userId },
				data: { imgUrl: filePath },
			});
			return {
				message: "User avatar updated",
				imgUrl: filePath,
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

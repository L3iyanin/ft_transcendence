import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import Authenticator from "api42client";
import { PrismaClient, User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { AuthUserData } from "./auth.interface";
var jwtService_2 = require("jsonwebtoken");
@Injectable()
export class AuthService {
	prisma: PrismaClient;
	constructor() {
		this.prisma = new PrismaClient();
	}

	async getUserData(code: string): Promise<AuthUserData> {
		try {
			const auth: Authenticator = new Authenticator(
				process.env.UID,
				process.env.SECRET,
				process.env.REDIRECT_URI
			);
			const token = await auth.get_Access_token(code);

			const data = await auth.get_user_data(token.access_token);
			const fullName: any = data.first_name + " " + data.last_name;
			const userData: AuthUserData = {
				username: data.login,
				fullName: fullName,
				email: data.email,
			};
			return userData;
		} catch (exception) {
			throw new HttpException("42 code not correct", HttpStatus.UNAUTHORIZED);
		}
	}

	async saveUserInDatabase(username: string, fullName: string, imgUrl: string, email: string) {
		try {
			const userExist = await this.prisma.user.findFirst({
				where: {
					login: username,
				},
			});
			if (userExist) {
				return {
					firstTime: false,
					user: userExist,
				};
			} else {
				const user = await this.prisma.user.create({
					data: {
						username: username,
						fullName: fullName,
						login: username,
						imgUrl: imgUrl,
						email: email,
					},
				});
				return {
					firstTime: true,
					user: user,
				};
			}
		} catch (err) {
			throw new HttpException(err.message, err.status);
		}
	}

	async createJwtToken(username: string, fullName: string, id: number) {
		const jwtTokenService = new JwtService();
		const payload = {
			fullName: fullName,
			username: username,
			id: id,
		};
		const jwt = await jwtTokenService.signAsync(payload, {
			secret: process.env.JWT_SECRET,
			expiresIn: "7d",
		});
		return jwt;
	}

	getImageProfileUrl(username: string) {
		const avatarImageUrl = `https://myanimelist.tech/api/avatar?&name=${username}&animeName=One_Piece`;
		return avatarImageUrl;
	}

	async getUserById(userId: number): Promise<User> {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					id: userId,
				},
			});
			return user;
		} catch (err) {
			throw new HttpException(err.message, err.status);
		}
	}

	async auth42(code: string) {
		try {
			const userData: AuthUserData = await this.getUserData(code);
			const avatarImage = this.getImageProfileUrl(userData.username);
			const { user, firstTime } = await this.saveUserInDatabase(
				userData.username,
				userData.fullName,
				avatarImage,
				userData.email
			);
			return {
				user: user,
				firstTime: firstTime,
			};
		} catch (err) {
			throw new HttpException(err.message, err.status);
		}
	}

	async destroyJwtToken(username: string, fullName: string, id: number) {
		const jwtTokenService = new JwtService();
		const payload = {
			fullName: fullName,
			username: username,
			id: id,
		};
		const jwt = await jwtTokenService.signAsync(payload, {
			secret: process.env.JWT_SECRET,
			expiresIn: 1,
		});
		return jwt;
	}
}

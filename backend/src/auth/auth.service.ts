import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import Authenticator from "api42client";
import { PrismaClient } from "@prisma/client";
// https://api.intra.42.fr/oauth/authorize?client_id=0db615c858576d32d6d34de5d45ec58e758fbd4a2b1e3adce1ed8f90bbee2a44&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fauth%2F42&response_type=code
import { JwtService } from "@nestjs/jwt";
import { AuthUserData } from "./auth.interface";
var jwtService_2 = require("jsonwebtoken");
const prisma = new PrismaClient();
@Injectable()
export class AuthService {
	constructor() {}

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
			};
			return userData;
		} catch (exception) {
			//! return exception 500
			console.log(exception);
			throw new HttpException("42 code not correct", HttpStatus.UNAUTHORIZED);
		}
	}

	async saveUserInDatabase(username: string, fullName: string, imgUrl: string) {
		try {
			const userExist = await prisma.user.findFirst({
				where: {
					login: username,
				},
			});
			if (userExist) {
				return userExist;
			} else {
				const user = await prisma.user.create({
					data: {
						username: username,
						fullName: fullName,
						login: username,
						imgUrl: imgUrl,
					},
				});
				return user;
			}
		} catch (exception) {
			//! return exception 500
			console.log("ERROR " + exception);
		}
	}

	async createJwtToken(username: string, fullName: string, id : number) {
		const jwtTokenService = new JwtService();
		const payload = {
			fullName: fullName,
			username: username,
			id : id
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
}

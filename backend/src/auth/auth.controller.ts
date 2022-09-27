import { Controller, Get, Post } from "@nestjs/common";
import { UseGuards } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { HttpException } from "@nestjs/common";
import { Body } from "@nestjs/common";
import { Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { HttpError } from "sib-api-v3-typescript";
import { UserGuard } from "src/users/user.guard";
import { UsersService } from "src/users/users.service";
import { AuthUserData } from "./auth.interface";
import { AuthService } from "./auth.service";

@Controller("auth/42")
@ApiTags("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService : UsersService) {}
	@Get()
	async Auth42(@Req() req: Request, @Res() res: Response) {
		const code: any = req.query["code"];
		const user = await this.authService.auth42(code)

		if (user.twoFactorAuth == false) {
			const token = await this.authService.createJwtToken(
				user.username,
				user.fullName,
				user.id
			);
			res.cookie("jwt", token, { httpOnly: true });
			return res.send({
				status: 200,
				data: user,
			});

		} else {
			throw new HttpException("Please pass through 2FA", 403)
		}
	}

	@UseGuards(UserGuard)
	@Post('/2fa')
	async pass2FA(@Body() body, @Req() req, @Res() res: Response){
		const userId = req.user.id
		const check : boolean =  await this.userService.isTwoFactorAuthenticationCodeValid(body.secret, userId)
		if (check == true){
			const user = await this.authService.getUserById(userId)
			const token = await this.authService.createJwtToken(
				user.username,
				user.fullName,
				user.id
				);
				res.cookie("jwt", token, { httpOnly: true });
				return res.send({
					status: 200,
					data: user,
				});
		}
		else{
			throw new HttpException("2FA SECRET IS INCOORECT", 401);

		}
	}
}

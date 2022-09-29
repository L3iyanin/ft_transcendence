import { Body, Controller, Get, HttpException, Post, UseGuards } from "@nestjs/common";
import { Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { UserGuard } from "src/users/user.guard";
import { UsersService } from "src/users/users.service";
import { AuthUserData } from "./auth.interface";
import { AuthService } from "./auth.service";
import { TwoFADto } from "./dto/twoFA.dto";

// interface user {}
@Controller("auth/42")
@ApiTags("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UsersService
	) {}
	@Get()
	async Auth42(@Req() req: Request, @Res() res: Response) {
		const code: any = req.query["code"];
		const user = await this.authService.auth42(code);

		if (user.twoFactorAuth == false) {
			const token = await this.authService.createJwtToken(
				user.username,
				user.fullName,
				user.id
			);
			res.cookie("jwt", token, { httpOnly: true });
			return res.send({
				status: 200,
				data: {...user, token}
			});
		} else {
			throw new HttpException(
				{
					message: "Please pass through 2FA",
					userId: user.id,
				},
				403
			);
		}
	}
	
	@Post("/2fa")
	async pass2FA(@Body() payload: TwoFADto, @Res() res: Response) {
		const userId = payload.userId;
		const check: boolean = await this.userService.isTwoFactorAuthenticationCodeValid(
			payload.secret,
			userId
		);
		if (check == true) {
			const user = await this.authService.getUserById(userId);
			const token = await this.authService.createJwtToken(
				user.username,
				user.fullName,
				user.id
			);
			res.cookie("jwt", token, { httpOnly: true });
			return res.send({
				status: 200,
				data: {...user, token},
			});
		} else {
			throw new HttpException("2FA SECRET IS INCOORECT", 401);
		}
	}

	@UseGuards(UserGuard)
	@Get("logout")
	async logout(@Req() req, @Res() res: Response) {
		const user = req.user;
		const token = await this.authService.destroyJwtToken(user.username, user.fullName, user.id);
		res.cookie("jwt", token, { httpOnly: true, maxAge: 1 });
		return res.send({ message: "logout successfully" });
	}
}

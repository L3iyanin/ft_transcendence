import { Controller, Get } from "@nestjs/common";
import { Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthUserData } from "./auth.interface";
import { AuthService } from "./auth.service";

// interface user {}
@Controller("auth/42")
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@Get()
	async Auth42(@Req() req: Request, @Res() res: Response) {
		const code: any = req.query["code"];
		const userData: AuthUserData = await this.authService.getUserData(code);
		const avatarImage = this.authService.getImageProfileUrl(
			userData.userName
		);
		const user = await this.authService.saveUserInDatabase(
			userData.userName,
			userData.fullName,
			avatarImage
		);
		const token = await this.authService.crietJwtToken(
			user.username,
			user.fullName
		);
		res.cookie("jwt", token, { httpOnly: true });
		return res.send({
			status: 200,
			data: userData,
		});
	}
}

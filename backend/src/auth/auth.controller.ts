import { Controller, Get } from "@nestjs/common";
import { Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { AuthUserData } from "./auth.interface";
import { AuthService } from "./auth.service";

// interface user {}
@Controller("auth/42")
@ApiTags("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@Get()
	async Auth42(@Req() req: Request, @Res() res: Response) {
		const code: any = req.query["code"];
		const userData: AuthUserData = await this.authService.getUserData(code);
		console.log("====================================");
		console.log(userData);
		console.log("====================================");
		const avatarImage = this.authService.getImageProfileUrl(userData.username);
		const user = await this.authService.saveUserInDatabase(
			userData.username,
			userData.fullName,
			avatarImage
		);
		const token = await this.authService.createJwtToken(user.username, user.fullName, user.id);
		res.cookie("jwt", token, { httpOnly: true });
		return res.send({
			status: 200,
			data: user,
		});
	}
}

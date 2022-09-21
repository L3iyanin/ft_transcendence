import { CanActivate, ExecutionContext, Injectable, Req } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class UserGuard implements CanActivate {
	checkToken(jwt: string, req) {
		try {
			const jwtService = new JwtService();
			const verified = jwtService.verify(jwt, {
				secret: process.env.JWT_SECRET,
			});
			req.user = verified;
			return true;
		} catch (exception) {
			return false;
		}
	}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest();
		const jwt = request.cookies["jwt"];
		return this.checkToken(jwt, request);
	}
}

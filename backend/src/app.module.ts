import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { AuthModuls } from "./auth/auth.module";
import { AcceptLanguageResolver, I18nJsonLoader, I18nModule, QueryResolver } from "nestjs-i18n";
import * as path from 'path';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ".env",
			isGlobal: true,
		}),
		I18nModule.forRoot({
			fallbackLanguage: "en",
			loaderOptions: {
				path: path.join(__dirname, "/../i18n/"),
				watch: true,
			},
			resolvers: [{ use: QueryResolver, options: ["lang"] }, AcceptLanguageResolver],
		}),
		UsersModule,
		AuthModuls,
	],
})
export class AppModule {}

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(cookieParser());
	app.enableCors({
		credentials: true,
		origin: "http://localhost:3000",
	});

	const config = new DocumentBuilder()
		.setTitle("API Doc")
		.setDescription("API description")
		.setVersion("1.0")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);

	app.setGlobalPrefix("api");
	const PORT = process.env.PORT || 8080;
	await app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}/api`));
}
bootstrap();

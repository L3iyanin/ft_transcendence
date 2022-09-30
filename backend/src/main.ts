import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(cookieParser());
	app.useGlobalPipes(new ValidationPipe());
	app.enableCors({
		credentials: true,
		origin: true,
	});

	app.setGlobalPrefix("api");
	const config = new DocumentBuilder()
		.setTitle("API Doc")
		.setDescription("API description")
		.setVersion("1.0")
		.setBasePath("api/")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);

	const PORT = process.env.PORT || 8080;
	await app.listen(PORT, () => console.log(`Server running on ${process.env.BACKEND_URL}/api`));
}
bootstrap();

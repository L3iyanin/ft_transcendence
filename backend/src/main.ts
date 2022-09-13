import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		credentials: true,
		origin: "http://localhost:3000",
	});

	app.setGlobalPrefix("api/v1");
	const PORT = process.env.PORT || 8080;
	await app.listen(PORT, () =>
		console.log(`Server running on http://127.0.0.1:${PORT}/api`)
	);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials : true,
    origin : "http://localhost:3000"
  });

  app.setGlobalPrefix('api');
  const PORT = process.env.PORT || 8080;
  await app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
bootstrap();

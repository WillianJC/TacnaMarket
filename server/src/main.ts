import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.NEST_PORT || 3000;
  const production = process.env.PRODUCTION_MODE === 'true';
  const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(port);

  const logger = new Logger('Bootstrap');

  logger.log(`Environment: ${production ? 'production' : 'development'}`);
  logger.log(`CORS Origin: ${corsOrigin}`);
  logger.log(`Server is running on port: ${port}`);
}
bootstrap();

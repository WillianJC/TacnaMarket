import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.NEST_PORT || 3000;
  const production = process.env.PRODUCTION_MODE === 'true';
  const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';

  // Permitir múltiples orígenes en desarrollo, solo el especificado en producción
  const corsOrigins = production
    ? [corsOrigin]
    : [corsOrigin, 'http://localhost:5173', 'http://localhost:3000', 'http://localhost:4173'];

  app.enableCors({
    origin: corsOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(port, '0.0.0.0');

  const logger = new Logger('Bootstrap');

  logger.log(`Environment: ${production ? 'production' : 'development'}`);
  logger.log(`CORS Origins: ${corsOrigins.join(', ')}`);
  logger.log(`Server is running on port: ${port}`);
}
bootstrap();

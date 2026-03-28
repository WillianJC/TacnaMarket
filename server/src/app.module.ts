import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const databaseUrl = config.get<string>('DATABASE_URL');
        const isProduction = config.get<string>('NODE_ENV') === 'production';
        const sslEnv = config.get<string>('POSTGRES_SSL');
        const ssl = sslEnv === 'false' ? false : { rejectUnauthorized: false };

        const base = {
          type: 'postgres' as const,
          entities: [User],
          synchronize: !isProduction,
        };

        if (databaseUrl) {
          return { ...base, url: databaseUrl, ssl };
        }

        return {
          ...base,
          host: config.get<string>('POSTGRES_HOST'),
          port: config.get<number>('POSTGRES_PORT'),
          database: config.get<string>('POSTGRES_DB'),
          username: config.get<string>('POSTGRES_USER'),
          password: config.get<string>('POSTGRES_PASSWORD'),
          ssl,
        };
      },
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}

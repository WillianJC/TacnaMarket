import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { User } from './user/entities/user.entity';
import { Product, Category } from './product/entities';
import { DatabaseSeederService } from './database/database-seeder.service';

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
          entities: [User, Product, Category],
          synchronize: !isProduction,
          dropSchema: false,
        };

        if (databaseUrl) {
          return { ...base, url: databaseUrl, ssl };
        }

        return {
          ...base,
          host: config.get<string>('DB_HOST') || config.get<string>('POSTGRES_HOST'),
          port: Number(config.get<string>('DB_PORT') || config.get<string>('POSTGRES_PORT') || 5432),
          database: config.get<string>('DB_DATABASE') || config.get<string>('POSTGRES_DB'),
          username: config.get<string>('DB_USERNAME') || config.get<string>('POSTGRES_USER'),
          password: config.get<string>('DB_PASSWORD') || config.get<string>('POSTGRES_PASSWORD'),
          ssl,
        };
      },
    }),
    TypeOrmModule.forFeature([User, Product, Category]),
    UserModule,
    AuthModule,
    ProductModule,
  ],
  providers: [DatabaseSeederService],
})
export class AppModule implements OnModuleInit {
  constructor(private seederService: DatabaseSeederService) {}

  async onModuleInit() {
    await this.seederService.seedDefaultUser();
  }
}

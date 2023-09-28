import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { UserEntity } from '../user/entities/user.entity';
import { readFileSync } from 'fs';
import { AuthModule } from '../auth/auth.module';
import { IngredientModule } from '../ingredient/ingredient.module';
import { IngredientEntity } from '../ingredient/entities/ingredient.entity';

@Module({
  imports: [
    UserModule,
    AuthModule,
    IngredientModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      entities: [UserEntity, IngredientEntity],
      logging: true,
      ssl: {
        rejectUnauthorized: false,
        ca: readFileSync(
          'apps/back-end/src/assets/ca-certificate.crt'
        ).toString(),
      },
    }),
  ],
})
export class AppModule {}

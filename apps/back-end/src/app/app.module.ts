import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { UserEntity } from '../user/entities/user.entity';
import { readFileSync } from 'fs';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      entities: [],
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

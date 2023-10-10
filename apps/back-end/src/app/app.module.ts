import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { UserEntity } from '../user/entities/user.entity';
import { readFileSync } from 'fs';
import { AuthModule } from '../auth/auth.module';
import { IngredientModule } from '../ingredient/ingredient.module';
import { IngredientEntity } from '../ingredient/entities/ingredient.entity';
import { RecipeModule } from '../recipe/recipe.module';
import { RecipeEntity } from '../recipe/entities/recipe.entity';
import { CommentEntity } from '../comments/entities/comment.entity';

@Module({
  imports: [
    UserModule,
    AuthModule,
    IngredientModule,
    RecipeModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db-postgresql-nyc1-36951-do-user-14647314-0.b.db.ondigitalocean.com',
      port: 25060,
      database: 'defaultdb',
      username: 'doadmin',
      password: 'AVNS_u7JP2b6pyh878E8w61I',
      entities: [UserEntity, RecipeEntity, IngredientEntity, CommentEntity],
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

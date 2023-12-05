import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from '../user/user.module'
import { UserEntity } from '../user/entities/user.entity'
import { AuthModule } from '../auth/auth.module'
import { IngredientModule } from '../ingredient/ingredient.module'
import { IngredientEntity } from '../ingredient/entities/ingredient.entity'
import { RecipeModule } from '../recipe/recipe.module'
import { RecipeEntity } from '../recipe/entities/recipe.entity'
import { CommentEntity } from '../recipe/entities/recipe-comment.entity'
import { RecipeIngredientEntity } from '../recipe/entities/recipe-ingredient.entity'
import { RatingEntity } from '../recipe/entities/recipe-rating.entity'

@Module({
  imports: [
    UserModule,
    AuthModule,
    IngredientModule,
    RecipeModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.ENV.DB_HOST,
      port: process.ENV.DB_PORT,
      database: process.ENV.DB_NAME,
      username: process.ENV.DB_USER,
      password: process.ENV.DB_PASSWORD,
      entities: [
        UserEntity,
        RecipeEntity,
        IngredientEntity,
        RatingEntity,
        RecipeIngredientEntity,
        CommentEntity,
      ],
      logging: true,
      ssl: {
        rejectUnauthorized: false,
        ca: process.env.CRT,
      },
    }),
  ],
})
export class AppModule {}

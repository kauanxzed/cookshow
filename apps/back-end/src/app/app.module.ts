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
import { RecipeIngredientEntity } from '../recipe/entities/recipe-ingredient.entity';

@Module({
  imports: [
    UserModule,
    AuthModule,
    IngredientModule,
    RecipeModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'cookshow123',
      entities: [UserEntity, RecipeEntity, IngredientEntity, RecipeIngredientEntity],
      logging: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}

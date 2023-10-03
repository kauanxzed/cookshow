import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeEntity } from './entities/recipe.entity';
import { UserModule } from '../user/user.module';
import { IngredientModule } from '../ingredient/ingredient.module';
import { RecipeIngredientEntity } from './entities/recipe-ingredient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecipeEntity, RecipeIngredientEntity]),
    UserModule,
    IngredientModule,
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}

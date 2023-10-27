import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeEntity } from './entities/recipe.entity';
import { UserModule } from '../user/user.module';
import { IngredientModule } from '../ingredient/ingredient.module';
import { RecipeIngredientEntity } from './entities/recipe-ingredient.entity';
import { RecipeRatingService } from './recipe.rating.service';
import { RatingEntity } from './entities/recipe-rating.entity';
import { CommentEntity } from './entities/recipe-comment.entity';
import { RecipeCommentService } from './recipe.comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecipeEntity,
      RecipeIngredientEntity,
      RatingEntity,
      CommentEntity,
    ]),
    UserModule,
    IngredientModule,
  ],
  controllers: [RecipeController],
  providers: [RecipeService, RecipeRatingService, RecipeCommentService],
})
export class RecipeModule {}

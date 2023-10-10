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
      url: "postgresql://doadmin:AVNS_u7JP2b6pyh878E8w61I@db-postgresql-nyc1-36951-do-user-14647314-0.b.db.ondigitalocean.com:25060/defaultdb?statusColor=686B6F&env=development&name=DigitalOcean&tLSMode=2&usePrivateKey=false&safeModeLevel=0&advancedSafeModeLevel=0&driverVersion=0",
      entities: [UserEntity, RecipeEntity, IngredientEntity, RecipeIngredientEntity],
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

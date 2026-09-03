import { Module } from '@nestjs/common';
import { AthletesInCategoriesService } from './athletes_in_categories.service';
import { AthletesInCategoriesController } from './athletes_in_categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AthletesInCategory } from './entities/athletes_in_category.entity';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([AthletesInCategory]),
    UsersModule,
    RolesModule
  ],
  controllers: [AthletesInCategoriesController],
  providers: [AthletesInCategoriesService],
})
export class AthletesInCategoriesModule {}

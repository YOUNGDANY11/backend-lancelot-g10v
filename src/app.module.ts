import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { AthletesInCategoriesModule } from './athletes_in_categories/athletes_in_categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    })
    ,TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(configService:ConfigService) => ({
        type:'postgres',
        url:configService.get<string>('URL_DB'),
        synchronize:true,
        autoLoadEntities:true
      })
    }), UsersModule, AuthModule, RolesModule, AthletesInCategoriesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

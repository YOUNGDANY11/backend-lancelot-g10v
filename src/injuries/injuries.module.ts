import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from 'src/users/users.module'
import { Injury } from './entities/injury.entity'
import { InjuriesController } from './injuries.controller'
import { InjuriesService } from './injuries.service'

@Module({
  imports: [TypeOrmModule.forFeature([Injury]), UsersModule],
  controllers: [InjuriesController],
  providers: [InjuriesService],
  exports: [InjuriesService],
})
export class InjuriesModule {}

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from 'src/users/users.module'
import { ParentalConsentsController } from './parental-consents.controller'
import { ParentalConsentsService } from './parental-consents.service'
import { ParentalConsent } from './entities/parental-consent.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ParentalConsent]), UsersModule],
  controllers: [ParentalConsentsController],
  providers: [ParentalConsentsService],
  exports: [ParentalConsentsService],
})
export class ParentalConsentsModule {}

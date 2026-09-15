import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ParentalConsentsModule } from 'src/parental_consents/parental-consents.module'
import { UsersModule } from 'src/users/users.module'
import { HealthRecord } from './entities/health-record.entity'
import { HealthRecordsController } from './health-records.controller'
import { HealthRecordsService } from './health-records.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([HealthRecord]),
    UsersModule,
    ParentalConsentsModule,
  ],
  controllers: [HealthRecordsController],
  providers: [HealthRecordsService],
})
export class HealthRecordsModule {}

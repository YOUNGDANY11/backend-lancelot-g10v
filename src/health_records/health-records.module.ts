import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ParentalConsentsModule } from 'src/parental_consents/parental-consents.module'
import { UsersModule } from 'src/users/users.module'
import { HealthRecordAccessLog } from './entities/health-record-access-log.entity'
import { HealthRecord } from './entities/health-record.entity'
import { HealthRecordAuditService } from './health-record-audit.service'
import { HealthRecordsController } from './health-records.controller'
import { HealthRecordsService } from './health-records.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([HealthRecord, HealthRecordAccessLog]),
    UsersModule,
    ParentalConsentsModule,
  ],
  controllers: [HealthRecordsController],
  providers: [HealthRecordsService, HealthRecordAuditService],
})
export class HealthRecordsModule {}

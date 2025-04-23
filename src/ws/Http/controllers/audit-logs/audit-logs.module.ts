import { Module } from '@nestjs/common';
import { AuditLogsController } from './audit-logs.controller';
import { DatabaseService } from 'src/Infra/persistance/database/database.service';

@Module({
  controllers: [AuditLogsController],
  providers: [DatabaseService],
})
export class AuditLogsModule {}
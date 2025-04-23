import { Module } from '@nestjs/common';
import { DevelopmentalAlertsController } from './developmental-alerts.controller';
import { DatabaseService } from 'src/Infra/persistance/database/database.service';

@Module({
  controllers: [DevelopmentalAlertsController],
  providers: [DatabaseService],
})
export class DevelopmentalAlertsModule {}
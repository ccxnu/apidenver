import { Module } from '@nestjs/common';
import { EmailVerificationsController } from './email-verifications.controller';
import { DatabaseService } from 'src/Infra/persistance/database/database.service';

@Module({
  controllers: [EmailVerificationsController],
  providers: [DatabaseService],
})
export class EmailVerificationsModule {}
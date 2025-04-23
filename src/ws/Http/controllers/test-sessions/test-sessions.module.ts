import { Module } from '@nestjs/common';
import { TestSessionsController } from './test-sessions.controller';
import { DatabaseService } from 'src/Infra/persistance/database/database.service';

@Module({
  controllers: [TestSessionsController],
  providers: [DatabaseService],
})
export class TestSessionsModule {}
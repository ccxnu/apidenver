import { Module } from '@nestjs/common';
import { TestResultsController } from './test-results.controller';
import { DatabaseService } from 'src/Infra/persistance/database/database.service';

@Module({
  controllers: [TestResultsController],
  providers: [DatabaseService],
})
export class TestResultsModule {}
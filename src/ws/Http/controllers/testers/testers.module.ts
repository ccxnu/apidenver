import { Module } from '@nestjs/common';
import { TestersController } from './testers.controller';
import { DatabaseService } from 'src/Infra/persistance/database/database.service';

@Module({
  controllers: [TestersController],
  providers: [DatabaseService],
})
export class TestersModule {}
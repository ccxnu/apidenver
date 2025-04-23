import { Module } from '@nestjs/common';
import { TestItemsController } from './test-items.controller';
import { DatabaseService } from 'src/Infra/persistance/database/database.service';

@Module({
  controllers: [TestItemsController],
  providers: [DatabaseService],
})
export class TestItemsModule {}
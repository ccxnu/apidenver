import { Module } from '@nestjs/common';
import { ChildrenController } from './children.controller';
import { DatabaseService } from 'src/Infra/persistance/database/database.service';

@Module({
  controllers: [ChildrenController],
  providers: [DatabaseService],
})
export class ChildrenModule {}
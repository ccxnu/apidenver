import { Module } from '@nestjs/common';
import { ParentsController } from './parents.controller';
import { DatabaseService } from 'src/Infra/persistance/database/database.service';

@Module({
  controllers: [ParentsController],
  providers: [DatabaseService],
})
export class ParentsModule {}
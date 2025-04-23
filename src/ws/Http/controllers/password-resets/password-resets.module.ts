import { Module } from '@nestjs/common';
import { PasswordResetsController } from './password-resets.controller';
import { DatabaseService } from 'src/Infra/persistance/database/database.service';

@Module({
  controllers: [PasswordResetsController],
  providers: [DatabaseService],
})
export class PasswordResetsModule {}
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatabaseService } from 'src/Infra/persistance/database/database.service';

@Controller('email-verifications')
export class EmailVerificationsController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post()
  create(@Body() createEmailVerificationDto: any) {
    const db = this.databaseService.getDb();
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO dnv_email_verifications (verification_id, user_id, token, expires_at, consumed_at) VALUES (?, ?, ?, ?, ?)';
      const { verification_id, user_id, token, expires_at, consumed_at } = createEmailVerificationDto;
      db.run(sql, [verification_id, user_id, token, expires_at, consumed_at], function(err: any) {
        if (err) {
          reject(err);
        } else {
          resolve({ verification_id: this.lastID });
        }
      });
    });
  }

  @Get()
  findAll() {
    const db = this.databaseService.getDb();
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM dnv_email_verifications', [], (err: any, rows: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const db = this.databaseService.getDb();
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM dnv_email_verifications WHERE verification_id = ?', [id], (err: any, row: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmailVerificationDto: any) {
    const db = this.databaseService.getDb();
    return new Promise((resolve, reject) => {
      const { user_id, token, expires_at, consumed_at } = updateEmailVerificationDto;
      const sql = 'UPDATE dnv_email_verifications SET user_id = ?, token = ?, expires_at = ?, consumed_at = ? WHERE verification_id = ?';
      db.run(sql, [user_id, token, expires_at, consumed_at, id], function(err: any) {
        if (err) {
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      });
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const db = this.databaseService.getDb();
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM dnv_email_verifications WHERE verification_id = ?', [id], function(err: any) {
        if (err) {
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      });
    });
  }
}
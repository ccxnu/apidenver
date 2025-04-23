import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatabaseService } from 'src/Infra/persistance/database/database.service';

@Controller('password-resets')
export class PasswordResetsController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post()
  create(@Body() createPasswordResetDto: any) {
    const db = this.databaseService.getDb();
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO dnv_password_resets (reset_id, user_id, token, expires_at) VALUES (?, ?, ?, ?)';
      const { reset_id, user_id, token, expires_at } = createPasswordResetDto;
      db.run(sql, [reset_id, user_id, token, expires_at], function (err: any) {
        if (err) {
          reject(err);
        } else {
          resolve({ reset_id: this.lastID });
        }
      });
    });
  }

  @Get()
  findAll() {
    const db = this.databaseService.getDb();
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM dnv_password_resets', [], (err: any, rows: any) => {
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
      db.get('SELECT * FROM dnv_password_resets WHERE reset_id = ?', [id], (err: any, row: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePasswordResetDto: any) {
    const db = this.databaseService.getDb();
    return new Promise((resolve, reject) => {
      const { user_id, token, expires_at, consumed_at } = updatePasswordResetDto;
      const sql = 'UPDATE dnv_password_resets SET user_id = ?, token = ?, expires_at = ?, consumed_at = ? WHERE reset_id = ?';
      db.run(sql, [user_id, token, expires_at, consumed_at, id], function (err: any) {
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
      db.run('DELETE FROM dnv_password_resets WHERE reset_id = ?', [id], function (err: any) {
        if (err) {
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      });
    });
  }
}
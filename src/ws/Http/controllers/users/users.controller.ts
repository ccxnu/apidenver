import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatabaseService } from 'src/Infra/persistance/database/database.service';

@Controller('users')
export class UsersController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post()
  create(@Body() createUserDto: any) {
    const db = this.databaseService.getDb();
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO dnv_users (user_id, email, password_hash, role, is_verified, last_login, created_at, updated_at, deactivated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      const { user_id, email, password_hash, role, is_verified, last_login, created_at, updated_at, deactivated_at } = createUserDto;
      db.run(sql, [user_id, email, password_hash, role, is_verified, last_login, created_at, updated_at, deactivated_at], function(err: any) {
        if (err) {
          reject(err);
        } else {
          resolve({ user_id: user_id });
        }
      });
    });
  }

  @Get()
  findAll() {
    const db = this.databaseService.getDb();
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM dnv_users', [], (err: any, rows: any) => {
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
      db.get('SELECT * FROM dnv_users WHERE user_id = ?', [id], (err: any, row: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    const db = this.databaseService.getDb();
    return new Promise((resolve, reject) => {
        const { email, password_hash, role, is_verified, last_login, updated_at, deactivated_at } = updateUserDto;
        const sql = 'UPDATE dnv_users SET email = ?, password_hash = ?, role = ?, is_verified = ?, last_login = ?, updated_at = ?, deactivated_at = ? WHERE user_id = ?';
      db.run(sql, [email, password_hash, role, is_verified, last_login, updated_at, deactivated_at, id], function(err: any) {
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
      db.run('DELETE FROM dnv_users WHERE user_id = ?', [id], function(err: any) {
        if (err) {
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      });
    });
  }
}
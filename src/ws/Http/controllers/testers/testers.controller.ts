import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatabaseService } from 'src/Infra/persistance/database/database.service';

@Controller('testers')
export class TestersController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post()
  create(@Body() createTesterDto: any) {
    const db = this.databaseService.getDb();
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO dnv_testers (tst_id, tst_full_name, tst_professional_license, tst_specialty, tst_email, tst_phone) VALUES (?, ?, ?, ?, ?, ?)';
      const { tst_id, tst_full_name, tst_professional_license, tst_specialty, tst_email, tst_phone } = createTesterDto;
      db.run(sql, [tst_id, tst_full_name, tst_professional_license, tst_specialty, tst_email, tst_phone], function(err: any) {
        if (err) {
          reject(err);
        } else {
          resolve({ tst_id: this.lastID });
        }
      });
    });
  }

  @Get()
  findAll() {
    const db = this.databaseService.getDb();
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM dnv_testers', [], (err: any, rows: any) => {
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
      db.get('SELECT * FROM dnv_testers WHERE tst_id = ?', [id], (err: any, row: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTesterDto: any) {
    const db = this.databaseService.getDb();
    return new Promise((resolve, reject) => {
      const { tst_full_name, tst_professional_license, tst_specialty, tst_email, tst_phone } = updateTesterDto;
      const sql = 'UPDATE dnv_testers SET tst_full_name = ?, tst_professional_license = ?, tst_specialty = ?, tst_email = ?, tst_phone = ? WHERE tst_id = ?';
      db.run(sql, [tst_full_name, tst_professional_license, tst_specialty, tst_email, tst_phone, id], function(err: any) {
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
      db.run('DELETE FROM dnv_testers WHERE tst_id = ?', [id], function(err: any) {
        if (err) {
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      });
    });
  }
}
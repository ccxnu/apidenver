import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatabaseService } from 'src/Infra/persistance/database/database.service';

@Controller('parents')
export class ParentsController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post()
  create(@Body() createParentDto: any) {
    const db = this.databaseService.getDb();
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO dnv_parents (prt_id, prt_identification, prt_full_name, prt_phone, prt_email) VALUES (?, ?, ?, ?, ?)';
      const { prt_id, prt_identification, prt_full_name, prt_phone, prt_email } = createParentDto;
      db.run(sql, [prt_id, prt_identification, prt_full_name, prt_phone, prt_email], function(err: any) {
        if (err) {
          reject(err);
        } else {
          resolve({ prt_id: this.lastID });
        }
      });
    });
  }

  @Get()
  findAll() {
    const db = this.databaseService.getDb();
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM dnv_parents', [], (err: any, rows: any) => {
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
      db.get('SELECT * FROM dnv_parents WHERE prt_id = ?', [id], (err: any, row: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParentDto: any) {
    const db = this.databaseService.getDb();
    return new Promise((resolve, reject) => {
      const { prt_identification, prt_full_name, prt_phone, prt_email } = updateParentDto;
      const sql = 'UPDATE dnv_parents SET prt_identification = ?, prt_full_name = ?, prt_phone = ?, prt_email = ? WHERE prt_id = ?';
      db.run(sql, [prt_identification, prt_full_name, prt_phone, prt_email, id], function(err: any) {
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
      db.run('DELETE FROM dnv_parents WHERE prt_id = ?', [id], function(err: any) {
        if (err) {
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      });
    });
  }
}
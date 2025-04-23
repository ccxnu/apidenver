import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatabaseService } from 'src/Infra/persistance/database/database.service';

@Controller('children')
export class ChildrenController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post()
  create(@Body() createChildDto: any) {
    const db = this.databaseService.getDb();
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO dnv_children (chl_id, chl_first_name, chl_last_name, chl_birthdate, chl_gender, chl_gestational_age, chl_parent_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const { chl_id, chl_first_name, chl_last_name, chl_birthdate, chl_gender, chl_gestational_age, chl_parent_id } = createChildDto;
      db.run(sql, [chl_id, chl_first_name, chl_last_name, chl_birthdate, chl_gender, chl_gestational_age, chl_parent_id], function(err: any) {
        if (err) {
          reject(err);
        } else {
          resolve({ chl_id: this.lastID });
        }
      });
    });
  }

  @Get()
  findAll() {
    const db = this.databaseService.getDb();
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM dnv_children', [], (err: any, rows: any) => {
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
      db.get('SELECT * FROM dnv_children WHERE chl_id = ?', [id], (err: any, row: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChildDto: any) {
    const db = this.databaseService.getDb();
    return new Promise((resolve, reject) => {
      const { chl_first_name, chl_last_name, chl_birthdate, chl_gender, chl_gestational_age, chl_parent_id } = updateChildDto;
      const sql = 'UPDATE dnv_children SET chl_first_name = ?, chl_last_name = ?, chl_birthdate = ?, chl_gender = ?, chl_gestational_age = ?, chl_parent_id = ? WHERE chl_id = ?';
      db.run(sql, [chl_first_name, chl_last_name, chl_birthdate, chl_gender, chl_gestational_age, chl_parent_id, id], function(err: any) {
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
      db.run('DELETE FROM dnv_children WHERE chl_id = ?', [id], function(err: any) {
        if (err) {
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      });
    });
  }
}
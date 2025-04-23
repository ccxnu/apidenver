import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatabaseService } from 'src/Infra/persistance/database/database.service';

@Controller('test-results')
export class TestResultsController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post()
  create(@Body() createTestResultDto: any) {
    const db = this.databaseService.getDb();
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO dnv_test_results (trs_result_id, trs_session_id, trs_item_id, trs_result, trs_observations, trs_test_time, trs_attempts) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const { trs_result_id, trs_session_id, trs_item_id, trs_result, trs_observations, trs_test_time, trs_attempts } = createTestResultDto;
      db.run(sql, [trs_result_id, trs_session_id, trs_item_id, trs_result, trs_observations, trs_test_time, trs_attempts], function(err: any) {
        if (err) {
          reject(err);
        } else {
          resolve({ trs_result_id: this.lastID });
        }
      });
    });
  }

  @Get()
  findAll() {
    const db = this.databaseService.getDb();
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM dnv_test_results', [], (err: any, rows: any) => {
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
      db.get('SELECT * FROM dnv_test_results WHERE trs_result_id = ?', [id], (err: any, row: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestResultDto: any) {
    const db = this.databaseService.getDb();
    return new Promise((resolve, reject) => {
      const { trs_session_id, trs_item_id, trs_result, trs_observations, trs_test_time, trs_attempts } = updateTestResultDto;
      const sql = 'UPDATE dnv_test_results SET trs_session_id = ?, trs_item_id = ?, trs_result = ?, trs_observations = ?, trs_test_time = ?, trs_attempts = ? WHERE trs_result_id = ?';
      db.run(sql, [trs_session_id, trs_item_id, trs_result, trs_observations, trs_test_time, trs_attempts, id], function(err: any) {
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
      db.run('DELETE FROM dnv_test_results WHERE trs_result_id = ?', [id], function(err: any) {
        if (err) {
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      });
    });
  }
}
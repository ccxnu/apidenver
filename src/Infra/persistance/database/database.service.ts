import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as fs from 'node:fs';
const sqlite3 = require('sqlite3').verbose();
let db: any;
@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    db = new sqlite3.Database(':memory:');
    const sqlFilePath = 'docs/sql/create_tables.sql';
    const sqlFileCategorias = 'docs/sql/categorias_es.sql';
    try {
      const sql = fs.readFileSync(sqlFilePath, 'utf-8');
      db.exec(sql, (err) => {
        if (err) {
          console.error('SQL error', err.message);
        }
        try {
          const sqlCategorias = fs.readFileSync(sqlFileCategorias, 'utf-8');
          db.exec(sqlCategorias, (err) => {
            if (err) {
              console.error('SQL error', err.message);
            }
          });
        } catch (err) {
          console.error('Error reading SQL file:', err);
        }
      });
    } catch (err) {
      console.error('Error reading SQL file:', err)
    }
  }

  async onModuleDestroy() {
    db.close();
  }

  getDb() {
    return db;
  }
}
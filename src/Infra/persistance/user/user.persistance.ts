import { DatabaseService } from '../../database/database.service';
import { User } from '../../../Domain/Models/User';
import { UserRepository } from '../../../Application/Common/Repositories/user.repository';

export class UserPersistance implements UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}
  async findByEmail(email: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const db = this.databaseService.getDb();
      db.get('SELECT * FROM dnv_users WHERE email = ?', [email], (err: any, row: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(row ? row : null);
        }
      });
    });
  }
  async create(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      const db = this.databaseService.getDb();
      const { user_id, email, password_hash, role, is_verified, created_at } = user;
      db.run('INSERT INTO dnv_users (user_id, email, password_hash, role, is_verified, created_at) VALUES (?, ?, ?, ?, ?, ?)', [user_id, email, password_hash, role, is_verified, created_at], function (err: any) {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });
  }

  async findById(id: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const db = this.databaseService.getDb();
      db.get('SELECT * FROM dnv_users WHERE user_id = ?', [id], (err: any, row: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(row ? row : null);
        }
      });
    });
  }

  async update(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      const db = this.databaseService.getDb();
      const { user_id, email, password_hash, role, is_verified, updated_at } = user;
      db.run('UPDATE dnv_users SET email = ?, password_hash = ?, role = ?, is_verified = ?, updated_at = ? WHERE user_id = ?', [email, password_hash, role, is_verified, updated_at, user_id], function (err: any) {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });
  }

  async delete(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const db = this.databaseService.getDb();
      db.run('DELETE FROM dnv_users WHERE user_id = ?', [id], function (err: any) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  }
}
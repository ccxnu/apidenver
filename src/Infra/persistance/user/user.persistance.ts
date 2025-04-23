import { UserRepository } from "@Application/Common/Repositories/user.repository";
import { DatabaseService } from "../database/database.service";
import { IUser } from "@Domain/Entities/user";

export class User_Persistance implements UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}
  async findByEmail(email: string): Promise<IUser | null> {
    return new Promise((resolve, reject) => {
      const db = this.databaseService.getDb();
      db.get("SELECT * FROM dnv_users WHERE email = ?", [email], (err: any, row: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(row ? row : null);
        }
      });
    });
  }
  async create(user: IUser): Promise<void> {
    return new Promise((resolve, reject) => {
      const db = this.databaseService.getDb();
      const { user_id, email, password_hash, role, is_verified, created_at } =
        user;
      db.run(
        "INSERT INTO dnv_users (user_id, email, password_hash, role, is_verified, created_at) VALUES (?, ?, ?, ?, ?, ?)",
        [user_id, email, password_hash, role, is_verified, created_at],
        function (err: any) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  async findById(id: string): Promise<IUser | null> {
    return new Promise((resolve, reject) => {
      const db = this.databaseService.getDb();
      db.get("SELECT * FROM dnv_users WHERE user_id = ?", [id], (err: any, row: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(row ? row : null);
        }
      });
    });
  }
  async edit(user: IUser): Promise<void> {
    return new Promise((resolve, reject) => {
      const db = this.databaseService.getDb();
      const { user_id, email, password_hash, role, is_verified, updated_at } =
        user;
      db.run(
        "UPDATE dnv_users SET email = ?, password_hash = ?, role = ?, is_verified = ?, updated_at = ? WHERE user_id = ?",
        [email, password_hash, role, is_verified, updated_at, user_id],
        function (err: any) {
        if (err) {
         reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async delete(user: IUser): Promise<void> {
    return new Promise((resolve, reject) => {
      const db = this.databaseService.getDb();
      db.run("DELETE FROM dnv_users WHERE user_id = ?", [user.user_id], function (err: any) {
        if (err) {

          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  async findByIdOnDeleted(id: string): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }
  async findByIdWithDetails(id: string): Promise<any | null> {
    throw new Error("Method not implemented.");
  }
  async findByUsername(username?: string): Promise<IUser | null> {
    return new Promise((resolve, reject) => {
      const db = this.databaseService.getDb();
      db.get("SELECT * FROM dnv_users WHERE username = ?", [username], (err: any, row: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(row ? row : null);
        }
      });
   });
  }
  async findByUnique(unique: string): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }
  async findManyByFilters(props: any): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
  async findManyBySearchQueries(params: any): Promise<any[]> {

    throw new Error("Method not implemented.");
  }
  async editPassword(user: IUser): Promise<void> {
    return new Promise((resolve, reject) => {
      const db = this.databaseService.getDb();
      const { user_id, password_hash, updated_at } = user;
      db.run("UPDATE dnv_users SET password_hash = ?, updated_at = ? WHERE user_id = ?", [password_hash, updated_at, user_id], function (err: any) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
  });
 }
  async recover(user: IUser): Promise<void> {
    return new Promise((resolve, reject) => {
      const db = this.databaseService.getDb();
      const { user_id, is_verified, updated_at } = user;
      db.run("UPDATE dnv_users SET is_verified = ?, updated_at = ? WHERE user_id = ?", [is_verified, updated_at, user_id], function (err: any) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
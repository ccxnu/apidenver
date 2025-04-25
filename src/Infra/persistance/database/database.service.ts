import { Funciones } from "@Application/Common/Funciones/Funciones";
import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { hash } from "bcryptjs";
import * as fs from "fs/promises";
import * as path from "path";
import * as sqlite3 from "sqlite3";

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy
{
    private db: any;
    private readonly DB_PATH = path.join(process.cwd(), "data", "denver.db");

    async onModuleInit()
    {
        sqlite3.verbose();

        // 🧨 Eliminar la base anterior si existe
        try
        {
            await fs.rm(this.DB_PATH);
        }
        catch (err)
        {
            if (err.code !== "ENOENT")
            {
                console.error("Error deleting DB:", err);
            }
        }

        // 🆕 Crear nueva base de datos
        this.db = new sqlite3.Database(this.DB_PATH);

        try
        {
            const createSQL = await fs.readFile("docs/sql/create_tables.sql", "utf-8");
            const categoriasSQL = await fs.readFile("docs/sql/categorias_es.sql", "utf-8");

            await this.exec(createSQL);
            await this.exec(categoriasSQL);
            await this.createAdminUserIfNotExists();
        }
        catch (err)
        {
            console.error("Error loading SQL:", err);
        }
    }

    onModuleDestroy(): void
    {
        this.db.close((err: any) =>
        {
            if (err)
            {
                console.error("Failed to close the database:", err.message);
            }
        });
    }

    getDb(): any
    {
        return this.db;
    }

    private exec(sql: string): Promise<void>
    {
        return new Promise((resolve, reject) =>
        {
            this.db.exec(sql, (err: any) =>
            {
                if (err)
                {
                    console.error("SQL exec error:", err.message);
                    reject(err);
                }
                else
                {
                    resolve();
                }
            });
        });
    }

    private async createAdminUserIfNotExists(): Promise<void>
    {
        return new Promise((resolve, reject) =>
        {
            this.db.get(
                "SELECT * FROM dnv_users WHERE email = ?",
                ["doctor@example.com"],
                async (err: any, row: any) =>
                {
                    if (err) return reject(err);
                    if (row)
                    {
                        console.log("User already exists.");
                        return resolve();
                    }

                    const passwordHash = await hash("doctor123", 10);
                    const userId = Funciones.getNewUUID();

                    this.db.run(
                        "INSERT INTO dnv_users (user_id, name, email, password_hash, role, is_verified, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
                        [
                            userId,
                            "Pablo Cuenca Tester",
                            "doctor@example.com",
                            passwordHash,
                            "DOCTOR",
                            true,
                            new Date().toISOString(),
                        ],
                        (insertErr: any) =>
                        {
                            if (insertErr) return reject(insertErr);
                            console.log("User created!");
                            resolve();
                        },
                    );
                },
            );
        });
    }
}

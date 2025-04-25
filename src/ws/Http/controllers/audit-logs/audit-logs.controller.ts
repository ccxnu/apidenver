import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { DatabaseService } from "src/Infra/persistance/database/database.service";

@Controller("audit-logs")
export class AuditLogsController
{
    constructor(private readonly databaseService: DatabaseService)
    {}

    @Post()
    create(@Body() createAuditLogDto: any)
    {
        const db = this.databaseService.getDb();
        return new Promise((resolve, reject) =>
        {
            const sql =
                "INSERT INTO dnv_audit_logs (log_id, user_id, action_type, target_id, target_type, ip_address, user_agent, metadata) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            const { log_id, user_id, action_type, target_id, target_type, ip_address, user_agent, metadata } =
                createAuditLogDto;
            db.run(
                sql,
                [log_id, user_id, action_type, target_id, target_type, ip_address, user_agent, metadata],
                function (err: any)
                {
                    if (err)
                    {
                        reject(err);
                    }
                    else
                    {
                        resolve({ log_id: this.lastID });
                    }
                },
            );
        });
    }

    @Get()
    findAll()
    {
        const db = this.databaseService.getDb();
        return new Promise((resolve, reject) =>
        {
            db.all("SELECT * FROM dnv_audit_logs", [], (err: any, rows: any) =>
            {
                if (err)
                {
                    reject(err);
                }
                else
                {
                    resolve(rows);
                }
            });
        });
    }

    @Get(":id")
    findOne(@Param("id") id: string)
    {
        const db = this.databaseService.getDb();
        return new Promise((resolve, reject) =>
        {
            db.get("SELECT * FROM dnv_audit_logs WHERE log_id = ?", [id], (err: any, row: any) =>
            {
                if (err)
                {
                    reject(err);
                }
                else
                {
                    resolve(row);
                }
            });
        });
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateAuditLogDto: any)
    {
        const db = this.databaseService.getDb();
        return new Promise((resolve, reject) =>
        {
            const { user_id, action_type, target_id, target_type, ip_address, user_agent, metadata } =
                updateAuditLogDto;
            const sql =
                "UPDATE dnv_audit_logs SET user_id = ?, action_type = ?, target_id = ?, target_type = ?, ip_address = ?, user_agent = ?, metadata = ? WHERE log_id = ?";
            db.run(
                sql,
                [user_id, action_type, target_id, target_type, ip_address, user_agent, metadata, id],
                function (err: any)
                {
                    if (err)
                    {
                        reject(err);
                    }
                    else
                    {
                        resolve({ changes: this.changes });
                    }
                },
            );
        });
    }

    @Delete(":id")
    remove(@Param("id") id: string)
    {
        const db = this.databaseService.getDb();
        return new Promise((resolve, reject) =>
        {
            db.run("DELETE FROM dnv_audit_logs WHERE log_id = ?", [id], function (err: any)
            {
                if (err)
                {
                    reject(err);
                }
                else
                {
                    resolve({ changes: this.changes });
                }
            });
        });
    }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { DatabaseService } from "src/Infra/persistance/database/database.service";

@Controller("test-sessions")
export class TestSessionsController
{
    constructor(private readonly databaseService: DatabaseService)
    {}

    @Post()
    create(@Body() createTestSessionDto: any)
    {
        const db = this.databaseService.getDb();
        return new Promise((resolve, reject) =>
        {
            const sql =
                "INSERT INTO dnv_test_sessions (tts_session_id, tts_child_id, tts_tester_id, tts_test_date, tts_corrected_age, tts_general_notes, tts_status) VALUES (?, ?, ?, ?, ?, ?, ?)";
            const {
                tts_session_id,
                tts_child_id,
                tts_tester_id,
                tts_test_date,
                tts_corrected_age,
                tts_general_notes,
                tts_status,
            } = createTestSessionDto;
            db.run(
                sql,
                [
                    tts_session_id,
                    tts_child_id,
                    tts_tester_id,
                    tts_test_date,
                    tts_corrected_age,
                    tts_general_notes,
                    tts_status,
                ],
                function (err: any)
                {
                    if (err)
                    {
                        reject(err);
                    }
                    else
                    {
                        resolve({ tts_session_id: this.lastID });
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
            db.all("SELECT * FROM dnv_test_sessions", [], (err: any, rows: any) =>
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
            db.get("SELECT * FROM dnv_test_sessions WHERE tts_session_id = ?", [id], (err: any, row: any) =>
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
    update(@Param("id") id: string, @Body() updateTestSessionDto: any)
    {
        const db = this.databaseService.getDb();
        return new Promise((resolve, reject) =>
        {
            const { tts_child_id, tts_tester_id, tts_test_date, tts_corrected_age, tts_general_notes, tts_status } =
                updateTestSessionDto;
            const sql =
                "UPDATE dnv_test_sessions SET tts_child_id = ?, tts_tester_id = ?, tts_test_date = ?, tts_corrected_age = ?, tts_general_notes = ?, tts_status = ? WHERE tts_session_id = ?";
            db.run(
                sql,
                [tts_child_id, tts_tester_id, tts_test_date, tts_corrected_age, tts_general_notes, tts_status, id],
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
            db.run("DELETE FROM dnv_test_sessions WHERE tts_session_id = ?", [id], function (err: any)
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

import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { DatabaseService } from "src/Infra/persistance/database/database.service";

@Controller("developmental-alerts")
export class DevelopmentalAlertsController
{
    constructor(private readonly databaseService: DatabaseService)
    {}

    @Post()
    create(@Body() createDevelopmentalAlertDto: any)
    {
        const db = this.databaseService.getDb();
        return new Promise((resolve, reject) =>
        {
            const sql =
                "INSERT INTO dnv_developmental_alerts (dal_alert_id, dal_child_id, dal_item_id, dal_alert_type, dal_severity, dal_recommendations) VALUES (?, ?, ?, ?, ?, ?)";
            const { dal_alert_id, dal_child_id, dal_item_id, dal_alert_type, dal_severity, dal_recommendations } =
                createDevelopmentalAlertDto;
            db.run(
                sql,
                [dal_alert_id, dal_child_id, dal_item_id, dal_alert_type, dal_severity, dal_recommendations],
                function (err: any)
                {
                    if (err)
                    {
                        reject(err);
                    }
                    else
                    {
                        resolve({ dal_alert_id: this.lastID });
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
            db.all("SELECT * FROM dnv_developmental_alerts", [], (err: any, rows: any) =>
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
            db.get("SELECT * FROM dnv_developmental_alerts WHERE dal_alert_id = ?", [id], (err: any, row: any) =>
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
    update(@Param("id") id: string, @Body() updateDevelopmentalAlertDto: any)
    {
        const db = this.databaseService.getDb();
        return new Promise((resolve, reject) =>
        {
            const { dal_child_id, dal_item_id, dal_alert_type, dal_severity, dal_recommendations } =
                updateDevelopmentalAlertDto;
            const sql =
                "UPDATE dnv_developmental_alerts SET dal_child_id = ?, dal_item_id = ?, dal_alert_type = ?, dal_severity = ?, dal_recommendations = ? WHERE dal_alert_id = ?";
            db.run(
                sql,
                [dal_child_id, dal_item_id, dal_alert_type, dal_severity, dal_recommendations, id],
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
            db.run("DELETE FROM dnv_developmental_alerts WHERE dal_alert_id = ?", [id], function (err: any)
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

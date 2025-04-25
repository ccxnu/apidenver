import { ResponseProcess } from "@Application/Common/Response/Response";
import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { Public } from "@ws/Auth/decorator/public.decorator";
import { DatabaseService } from "src/Infra/persistance/database/database.service";

@Public()
@Controller("denver/test-items")
export class TestItemsController
{
    constructor(private readonly databaseService: DatabaseService)
    {}

    @Post()
    create(@Body() createTestItemDto: any)
    {
        const db = this.databaseService.getDb();
        return new Promise((resolve, reject) =>
        {
            const sql =
                "INSERT INTO dnv_test_items (tti_category_id, tti_item_code, tti_description, tti_percentile_25, tti_percentile_50, tti_percentile_75, tti_percentile_90, tti_item_type, tti_order, tti_question) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const {
                tti_category_id,
                tti_item_code,
                tti_description,
                tti_percentile_25,
                tti_percentile_50,
                tti_percentile_75,
                tti_percentile_90,
                tti_item_type,
                tti_order,
                tti_question,
            } = createTestItemDto;
            db.run(
                sql,
                [
                    tti_category_id,
                    tti_item_code,
                    tti_description,
                    tti_percentile_25,
                    tti_percentile_50,
                    tti_percentile_75,
                    tti_percentile_90,
                    tti_item_type,
                    tti_order,
                    tti_question,
                ],
                function (err: any)
                {
                    if (err)
                    {
                        reject(err);
                    }
                    else
                    {
                        resolve({ tti_item_id: this.lastID });
                    }
                },
            );
        });
    }

    @Get()
    async findAll(): Promise<ResponseProcess>
    {
        const response = new ResponseProcess();
        const db = this.databaseService.getDb();
        response.result = await new Promise((resolve, reject) =>
        {
            db.all("SELECT * FROM dnv_test_items", [], (err: any, rows: any) =>
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

        return response;
    }

    @Get(":id")
    findOne(@Param("id") id: string)
    {
        const db = this.databaseService.getDb();
        return new Promise((resolve, reject) =>
        {
            db.get("SELECT * FROM dnv_test_items WHERE tti_item_id = ?", [id], (err: any, row: any) =>
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
    update(@Param("id") id: string, @Body() updateTestItemDto: any)
    {
        const db = this.databaseService.getDb();
        return new Promise((resolve, reject) =>
        {
            const {
                tti_category_id,
                tti_item_code,
                tti_description,
                tti_percentile_25,
                tti_percentile_50,
                tti_percentile_75,
                tti_percentile_90,
                tti_item_type,
                tti_order,
                tti_question,
            } = updateTestItemDto;
            const sql =
                "UPDATE dnv_test_items SET tti_category_id = ?, tti_item_code = ?, tti_description = ?, tti_percentile_25 = ?, tti_percentile_50 = ?, tti_percentile_75 = ?, tti_percentile_90 = ?, tti_item_type = ?, tti_order = ?, tti_question = ? WHERE tti_item_id = ?";
            db.run(
                sql,
                [
                    tti_category_id,
                    tti_item_code,
                    tti_description,
                    tti_percentile_25,
                    tti_percentile_50,
                    tti_percentile_75,
                    tti_percentile_90,
                    tti_item_type,
                    tti_order,
                    tti_question,
                    id,
                ],
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
            db.run("DELETE FROM dnv_test_items WHERE tti_item_id = ?", [id], function (err: any)
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

import { ResponseProcess } from "@Application/Common/Response/Response";
import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { DatabaseService } from "src/Infra/persistance/database/database.service";

@Controller("parents")
export class ParentsController
{
    constructor(private readonly databaseService: DatabaseService)
    {}

    @Post("/CREATE")
    async create(@Body() createParentDto: any): Promise<ResponseProcess>
    {
        const db = this.databaseService.getDb();
        const response = new ResponseProcess();
        response.result = await new Promise((resolve, reject) =>
        {
            const sql =
                "INSERT INTO dnv_parents (prt_id, prt_identification, prt_full_name, prt_phone, prt_email) VALUES (?, ?, ?, ?, ?)";
            const { prt_id, prt_identification, prt_full_name, prt_phone, prt_email } = createParentDto;
            db.run(sql, [prt_id, prt_identification, prt_full_name, prt_phone, prt_email], function (err: any)
            {
                if (err)
                {
                    reject(err);
                }
                else
                {
                    resolve({ prt_id: this.lastID });
                }
            });
        });

        return response;
    }

    @Get()
    async findAll(): Promise<ResponseProcess>
    {
        const response = new ResponseProcess();
        const db = this.databaseService.getDb();
        response.result = await new Promise((resolve, reject) =>
        {
            db.all("SELECT * FROM dnv_parents", [], (err: any, rows: any) =>
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

    @Post("/SEARCH-BY-IDENTIFICATION")
    async findOne(@Body() body: any): Promise<ResponseProcess>
    {
        const response = new ResponseProcess();
        const db = this.databaseService.getDb();
        response.result = await new Promise((resolve, reject) =>
        {
            const { prt_identification } = body;
            db.get(
                "SELECT * FROM dnv_parents WHERE prt_identification = ?",
                [prt_identification],
                (err: any, row: any) =>
                {
                    if (err)
                    {
                        reject(err);
                    }
                    else
                    {
                        resolve(row);
                    }
                },
            );
        });

        return response;
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateParentDto: any)
    {
        const db = this.databaseService.getDb();
        return new Promise((resolve, reject) =>
        {
            const { prt_identification, prt_full_name, prt_phone, prt_email } = updateParentDto;
            const sql =
                "UPDATE dnv_parents SET prt_identification = ?, prt_full_name = ?, prt_phone = ?, prt_email = ? WHERE prt_id = ?";
            db.run(sql, [prt_identification, prt_full_name, prt_phone, prt_email, id], function (err: any)
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

    @Delete(":id")
    remove(@Param("id") id: string)
    {
        const db = this.databaseService.getDb();
        return new Promise((resolve, reject) =>
        {
            db.run("DELETE FROM dnv_parents WHERE prt_id = ?", [id], function (err: any)
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

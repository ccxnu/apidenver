import { Module } from "@nestjs/common";
import { AuditLogsController } from "./audit-logs.controller";

@Module({
    controllers: [AuditLogsController],
    providers: [],
})
export class AuditLogsModule
{}

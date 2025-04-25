import { Module } from "@nestjs/common";
import { DevelopmentalAlertsController } from "./developmental-alerts.controller";

@Module({
    controllers: [DevelopmentalAlertsController],
    providers: [],
})
export class DevelopmentalAlertsModule
{}

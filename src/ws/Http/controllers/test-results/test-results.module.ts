import { Module } from "@nestjs/common";
import { TestResultsController } from "./test-results.controller";

@Module({
    controllers: [TestResultsController],
    providers: [],
})
export class TestResultsModule
{}

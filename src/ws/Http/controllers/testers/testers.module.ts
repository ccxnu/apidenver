import { Module } from "@nestjs/common";
import { TestersController } from "./testers.controller";

@Module({
    controllers: [TestersController],
    providers: [],
})
export class TestersModule
{}

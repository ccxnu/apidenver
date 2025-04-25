import { Module } from "@nestjs/common";
import { TestSessionsController } from "./test-sessions.controller";

@Module({
    controllers: [TestSessionsController],
    providers: [],
})
export class TestSessionsModule
{}

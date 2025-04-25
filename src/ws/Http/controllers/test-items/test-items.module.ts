import { Module } from "@nestjs/common";
import { TestItemsController } from "./test-items.controller";

@Module({
    controllers: [TestItemsController],
    providers: [],
})
export class TestItemsModule
{}

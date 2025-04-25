import { Module } from "@nestjs/common";
import { ChildrenController } from "./children.controller";

@Module({
    controllers: [ChildrenController],
    providers: [],
})
export class ChildrenModule
{}

import { Module } from "@nestjs/common";
import { PasswordResetsController } from "./password-resets.controller";

@Module({
    controllers: [PasswordResetsController],
    providers: [],
})
export class PasswordResetsModule
{}

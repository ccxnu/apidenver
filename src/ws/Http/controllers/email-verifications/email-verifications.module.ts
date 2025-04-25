import { Module } from "@nestjs/common";
import { EmailVerificationsController } from "./email-verifications.controller";

@Module({
    controllers: [EmailVerificationsController],
    providers: [],
})
export class EmailVerificationsModule
{}

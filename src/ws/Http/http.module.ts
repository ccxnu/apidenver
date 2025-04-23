import { Module } from "@nestjs/common";

import { RegisterUserAccountController } from "./controllers/user/register-account.controller";

@Module({
    imports: [],
    controllers: [
        RegisterUserAccountController,
    ],
    providers: [
    ],
})
export class HttpModule
{}

import { Module } from "@nestjs/common";

import { PersistenceModule } from "@Infra/persistance/persistance.module";
import { CryptographyModule } from "@Infra/cryptography/cryptography.module";
import { UsersController } from "./controllers/users/users.controller";
import { LoginUseCase } from "@Application/UseCases/Auth/Login/LoginHandler";
import { TestItemsModule } from "./controllers/test-items/test-items.module";
import { TestersModule } from "./controllers/testers/testers.module";

@Module({
    imports: [PersistenceModule, CryptographyModule, TestItemsModule, TestersModule],
    controllers: [UsersController],
    providers: [LoginUseCase],
})
export class HttpModule
{}

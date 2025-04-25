import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { LoginUseCase } from "@Application/UseCases/Auth/Login/LoginHandler";
import { CryptographyModule } from "@Infra/cryptography/cryptography.module";

@Module({
    imports: [CryptographyModule],
    controllers: [UsersController],
    providers: [LoginUseCase],
})
export class UsersModule
{}

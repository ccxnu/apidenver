import { UserRepository } from "@Application/Common/Repositories/user.repository";
import { Module } from "@nestjs/common";
import { UserPersistance } from "./user/user.persistance";
import { DatabaseModule } from "@Infra/persistance/database/database.module";

@Module({
    imports: [DatabaseModule],
    providers: [{ provide: UserRepository, useClass: UserPersistance }],
    exports: [UserRepository],
})
export class PersistenceModule
{}

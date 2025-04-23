import { Module } from "@nestjs/common";

import { BcryptHasher } from "./bcrypt-hasher";
import { JwtEncrypter } from "./jwt-encrypter";
import { EnvModule } from "@Infra/env/env.module";
import { IEncrypter } from "@Application/Common/Interfaces/IEncrypter";
import { IHasher } from "@Application/Common/Interfaces/IHasher";

@Module({
    imports: [EnvModule],
    providers: [
        { provide: IEncrypter, useClass: JwtEncrypter },
        { provide: IHasher, useClass: BcryptHasher },
    ],
    exports: [IEncrypter, IHasher],
})
export class CryptographyModule
{}

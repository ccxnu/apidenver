import { IEncrypter } from "@Application/Common/Interfaces/IEncrypter";
import { EnvService } from "@Infra/env/env.service";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IActiveUser } from "@ws/Auth/interface/active-user";

@Injectable()
export class JwtEncrypter implements IEncrypter
{
    constructor(
        private readonly jwtService: JwtService,
        private readonly config: EnvService,
    )
    {}

    encrypt(payload: IActiveUser): Promise<string>
    {
        const expiresIn = this.config.get("JWT_ACCESS_TOKEN_TIME");

        return this.jwtService.signAsync(payload, { expiresIn });
    }
}

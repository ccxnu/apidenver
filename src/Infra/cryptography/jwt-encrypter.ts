import { IEncrypter } from "@Application/Common/Interfaces/IEncrypter";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IActiveUser } from "@ws/Auth/interface/active-user";

@Injectable()
export class JwtEncrypter implements IEncrypter
{
    constructor(private readonly jwtService: JwtService)
    {}

    encrypt(payload: IActiveUser): Promise<string>
    {
        return this.jwtService.signAsync(payload);
    }
}

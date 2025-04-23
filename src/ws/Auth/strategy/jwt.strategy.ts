import { EnvService } from "@Infra/env/env.service";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IActiveUser } from "../interface/active-user";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor(config: EnvService)
    {
        const SECRET_KEY = config.get("JWT_SECRET_KEY");

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: SECRET_KEY,
        });
    }

    async validate(payload: IActiveUser)
    {
        return payload;
    }
}

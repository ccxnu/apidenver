import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { JwtAuthGuard } from "./guards/jwt.guard";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { EnvModule } from "@Infra/env/env.module";
import { EnvService } from "@Infra/env/env.service";

@Module({
    imports: [
        EnvModule,
        PassportModule,
        JwtModule.registerAsync({
            global: true,
            imports: [EnvModule],
            inject: [EnvService],
            useFactory(env: EnvService)
            {
                const PRIVATE_KEY = env.get("JWT_SECRET_KEY");
                const TIME = env.get("JWT_ACCESS_TOKEN_TIME");

                return {
                  signOptions: { expiresIn: TIME },
                  secret: PRIVATE_KEY,
                };
            },
        }),
    ],
    providers: [
        JwtStrategy,
        { provide: APP_GUARD, useClass: JwtAuthGuard },
    ],
})
export class AuthModule
{}

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { EnvConfig } from "@Infra/env/env";
import { AuthModule } from "@ws/Auth/auth.module";
import { HttpModule } from "@ws/Http/http.module";
import { plainToInstance } from "class-transformer";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validate: (config) => plainToInstance(EnvConfig, config),
        }),
        AuthModule,
        HttpModule,
    ],
})
export class AppModule
{}

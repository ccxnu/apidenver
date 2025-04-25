import { IsIn, IsNumber, IsString } from "class-validator";

export class EnvConfig
{
    @IsIn(["production", "development"])
    NODE_ENV: "production" | "development" = "development";

    @IsString()
    DATABASE_URL: string;

    // JWT
    @IsNumber()
    JWT_ACCESS_TOKEN_TIME: number = 86400;

    @IsString()
    JWT_SECRET_KEY: string;

    @IsString()
    REDIS_URL: string;

    @IsString()
    EMAIL_SENDER: string;

    @IsString()
    APPLICATION: string = "denver";
}

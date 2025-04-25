import {
    IsString,
    MinLength,
    MaxLength,
    IsEmail,
    IsOptional,
    IsInt,
    Min,
    Max,
    IsDate,
    IsUUID,
    MaxDate,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateUserDto
{
    @IsUUID()
    id: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(255)
    age?: number;

    @IsEmail()
    email: string;

    @Type(() => Date)
    @IsDate()
    @MaxDate(new Date()) // debe ser en el pasado
    registrationDate: Date;
}

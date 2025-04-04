import { BadRequestException, Body, Controller, HttpCode, Post, UnauthorizedException } from "@nestjs/common";
import { z } from "zod";

import { InvalidCredentialsError } from "@/application/errors/invalid-credentials-error";
import { AuthenticateUserUseCase } from "@/application/use-cases/user/authenticate";
import { ResponseProcess } from "@/core/entities/response";
import { Public } from "@/infra/auth/decorator/public.decorator";
import { ZodValidationPipe } from "@/interface/http/pipes/zod-validation.pipe";

const schema = z.object({
    email: z.string().min(1, "El nombre de usuario es requerido").email(),
    password: z
        .string()
        .min(8, "La contraseña debe ser por lo menos de 8 caracteres")
        .max(60, "La contraseña debe ser menor de 60 caracteres"),
});

type BodySchema = z.input<typeof schema>;
const bodyValidationPipe = new ZodValidationPipe(schema);

@Public()
@Controller("/authenticate/sign-in")
export class AuthenticateUserController
{
    constructor(private readonly authenticateUseCase: AuthenticateUserUseCase)
    {}

    @Post()
    @HttpCode(200)
    async handle(@Body(bodyValidationPipe) body: BodySchema)
    {
        const response = await this.authenticateUseCase.execute(body);

        if (response.isLeft())
        {
            const error = response.value;

            switch (error.constructor)
            {
                case InvalidCredentialsError:
                    throw new UnauthorizedException(error.message);
                default:
                    throw new BadRequestException(error.message);
            }
        }

        const { user } = response.value;

        return new ResponseProcess({ user });
    }
}

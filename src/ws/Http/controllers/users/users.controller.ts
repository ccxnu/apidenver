import { ResponseProcess } from "@Application/Common/Response/Response";
import { LoginUseCase } from "@Application/UseCases/Auth/Login/LoginHandler";
import { Controller, Post, Body, HttpCode } from "@nestjs/common";
import { Public } from "@ws/Auth/decorator/public.decorator";

@Controller("user")
export class UsersController
{
    constructor(private readonly loginUseCase: LoginUseCase)
    {}

    @Public()
    @Post("/authentication/SIGN-UP")
    @HttpCode(200)
    async execute(@Body() signUpUserDto: any): Promise<ResponseProcess>
    {
        return await this.loginUseCase.handler({ email: signUpUserDto.email, password: signUpUserDto.password });
    }
}

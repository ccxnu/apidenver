import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { Public } from "@ws/Auth/decorator/public.decorator";
import { CreateUserDto } from "../dtos/user/create.dto";

@Public()
@Controller("/authenticate/register")
export class RegisterUserAccountController
{
    constructor()
    {}

    @Post()
    @HttpCode(200)
    async handle(@Body() body: CreateUserDto)
    {
        console.log(body instanceof CreateUserDto); // true
        return {
          status: 'success',
          data: body
        };
    }
}

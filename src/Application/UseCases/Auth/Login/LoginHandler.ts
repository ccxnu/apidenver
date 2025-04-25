import { IEncrypter } from "@Application/Common/Interfaces/IEncrypter";
import { IHasher } from "@Application/Common/Interfaces/IHasher";
import { UserRepository } from "@Application/Common/Repositories/user.repository";
import { ResponseProcess } from "@Application/Common/Response/Response";
import { Injectable } from "@nestjs/common";

export class LoginDto
{
    email!: string;
    password!: string;
}

@Injectable()
export class LoginUseCase
{
    constructor(
        private readonly hasher: IHasher,
        private readonly encrypter: IEncrypter,
        private readonly userRepository: UserRepository,
    )
    {}

    async handler(loginDto: LoginDto): Promise<ResponseProcess>
    {
        let response = new ResponseProcess();

        const user = await this.userRepository.findByEmail(loginDto.email);

        if (!user)
        {
            response.code = "COD_ERR";
            response.info = "Correo electrónico inválido";
            return response;
        }

        const isMatch = await this.hasher.compare(loginDto.password, user!.password_hash);

        if (!isMatch)
        {
            response.code = "COD_ERR";
            response.info = "Contraseña inválida";
            return response;
        }

        const token = await this.encrypter.encrypt({ sub: user!.user_id, email: user!.email, name: user!.email });
        response.result = token;

        return response;
    }
}

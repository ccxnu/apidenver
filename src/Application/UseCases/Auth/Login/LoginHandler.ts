import { IEncrypter } from "@Application/Common/Interfaces/IEncrypter";
import { IHasher } from "@Application/Common/Interfaces/IHasher";
import { UserRepository } from "@Application/Common/Repositories/user.repository";
import { ResponseProcess } from "@Application/Common/Response/Response";

export class LoginDto {
  email!: string;
  password!: string;
}

export class LoginHandler {
  constructor(
    private readonly hasher: IHasher,
    private readonly encrypter: IEncrypter,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(loginDto: LoginDto): Promise<ResponseProcess> {

    let response = new ResponseProcess();

    const user = await this.userRepository.findByEmail(loginDto.email);

    if (!user) {
        response.code = 'ERR';
        response.info = 'Invalid email or password';
    }

    const isMatch = await this.hasher.compare(loginDto.password, user!.passwordHash);

    if (!isMatch) {
      response.code = 'ERR';
      response.info = 'Invalid email or password';
    }

    const token = await this.encrypter.encrypt({ sub: user!.userId, email: user!.email, name: user!.email });
    response.result = token;

    return response;
  }
}

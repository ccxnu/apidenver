import { IHasher } from '../Common/Interfaces/IHasher';
import { IEncrypter } from '../Common/Interfaces/IEncrypter';
import { UserRepository } from '../Common/Repositories/user.repository';
import { Response } from '../Common/Response/Response';

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

  async execute(loginDto: LoginDto): Promise<Response> {
    const user = await this.userRepository.findByEmail(loginDto.email);

    if (!user) {
      return Response.fail('Invalid email or password');
    }

    const isMatch = await this.hasher.compare(
      loginDto.password,
      user.password_hash,
    );

    if (!isMatch) {
      return Response.fail('Invalid email or password');
    }

    const token = await this.encrypter.encrypt({ sub: user.user_id, role: user.role });

    return Response.success({ token });
  }
}
export class CreateUserDto
{
    id: number;

    username: string;

    password: string;

    age?: number;

    email: string;

    registrationDate: Date;
}

import { IHasher } from "@Application/Common/Interfaces/IHasher";
import { Injectable } from "@nestjs/common";
import { compare, hash } from "bcryptjs";

@Injectable()
export class BcryptHasher implements IHasher
{
    private HASH_SALT_LENGTH = 10;

    hash(plain: string): Promise<string>
    {
        return hash(plain, this.HASH_SALT_LENGTH);
    }

    compare(plain: string, hash: string): Promise<boolean>
    {
        return compare(plain, hash);
    }
}

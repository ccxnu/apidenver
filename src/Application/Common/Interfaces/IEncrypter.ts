import { IActiveUser } from "@ws/Auth/interface/active-user";

export abstract class IEncrypter
{
    abstract encrypt(payload: IActiveUser): Promise<string>;
}

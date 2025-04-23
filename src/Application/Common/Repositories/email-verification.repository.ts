import { IEmailVerification } from "@Domain/Entities/email-verification";

export abstract class EmailVerificationRepository
{
    abstract create(data: IEmailVerification): Promise<void>;
    abstract edit(data: IEmailVerification, user: any): Promise<void>;
    abstract delete(data: IEmailVerification): Promise<void>;
    abstract findOne(emailToken: string, userId: string): Promise<IEmailVerification | null>;
    abstract findOnebyUserId(userId: string): Promise<IEmailVerification | null>;
}

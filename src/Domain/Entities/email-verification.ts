export interface IEmailVerification
{
    verificationId: string;  // UUID como string
    userId: string;          // UUID como string
    token: string;
    expiresAt: Date;
    consumedAt: Date | null;
    createdAt: Date;
}

export class EmailVerification implements IEmailVerification
{
    verificationId: string;
    userId: string;
    token: string;
    expiresAt: Date;
    consumedAt: Date | null;
    createdAt: Date;

    constructor(data: IEmailVerification)
    {
        this.verificationId = data.verificationId;
        this.userId = data.userId;
        this.token = data.token;
        this.expiresAt = data.expiresAt;
        this.consumedAt = data.consumedAt;
        this.createdAt = data.createdAt;
    }
}

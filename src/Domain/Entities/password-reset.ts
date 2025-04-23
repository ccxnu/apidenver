export interface IPasswordReset
{
    resetId: string;  // UUID como string
    userId: string;   // UUID como string
    token: string;
    expiresAt: Date;
    consumedAt: Date | null;
    createdAt: Date;
}

export class PasswordReset implements IPasswordReset
{
    resetId: string;
    userId: string;
    token: string;
    expiresAt: Date;
    consumedAt: Date | null;
    createdAt: Date;

    constructor(data: IPasswordReset)
    {
        this.resetId = data.resetId;
        this.userId = data.userId;
        this.token = data.token;
        this.expiresAt = data.expiresAt;
        this.consumedAt = data.consumedAt;
        this.createdAt = data.createdAt;
    }
}

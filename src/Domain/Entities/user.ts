export interface IUser
{
    userId: string;  // UUID como string
    email: string;
    passwordHash: string;
    role: "admin" | "tester" | "viewer";
    isVerified: boolean;
    lastLogin: Date | null;
    createdAt: Date;
    updatedAt: Date | null;
    deactivatedAt: Date | null;
}

export class User implements IUser
{
    userId: string;
    email: string;
    passwordHash: string;
    role: "admin" | "tester" | "viewer";
    isVerified: boolean;
    lastLogin: Date | null;
    createdAt: Date;
    updatedAt: Date | null;
    deactivatedAt: Date | null;

    constructor(data: IUser)
    {
        this.userId = data.userId;
        this.email = data.email;
        this.passwordHash = data.passwordHash;
        this.role = data.role;
        this.isVerified = data.isVerified;
        this.lastLogin = data.lastLogin;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.deactivatedAt = data.deactivatedAt;
    }
}

export interface IUser
{
    user_id: string; // UUID como string
    name: string;
    email: string;
    password_hash: string;
    role: "ADMINISTRADOR" | "DOCTOR" | "REPRESENTANTE" | "PACIENTE";
    is_verified: boolean;
    last_login: Date | null;
    created_at: Date;
    updated_at: Date | null;
    deactivated_at: Date | null;
}

export class User implements IUser
{
    user_id: string;
    name: string;
    email: string;
    password_hash: string;
    role: "ADMINISTRADOR" | "DOCTOR" | "REPRESENTANTE" | "PACIENTE";
    is_verified: boolean;
    last_login: Date | null;
    created_at: Date;
    updated_at: Date | null;
    deactivated_at: Date | null;

    constructor(data: IUser)
    {
        this.user_id = data.user_id;
        this.name = data.name;
        this.email = data.email;
        this.password_hash = data.password_hash;
        this.role = data.role;
        this.is_verified = data.is_verified;
        this.last_login = data.last_login;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        this.deactivated_at = data.deactivated_at;
    }
}

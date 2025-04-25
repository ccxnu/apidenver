import { IUser } from "@Domain/Entities/user";

export abstract class UserRepository
{
    abstract findById(id: string): Promise<IUser | null>;
    abstract findByIdOnDeleted(id: string): Promise<IUser | null>;
    abstract findByIdWithDetails(id: string): Promise<any | null>;
    abstract findByUsername(username?: string): Promise<IUser | null>;
    abstract findByEmail(email: string): Promise<IUser | null>;
    abstract findByUnique(unique: string): Promise<IUser | null>;
    abstract findManyByFilters(props: any): Promise<any[]>;
    abstract findManyBySearchQueries(params: any): Promise<any[]>;
    abstract create(person: IUser): Promise<void>;
    abstract edit(person: IUser): Promise<void>;
    abstract editPassword(person: IUser): Promise<void>;
    abstract delete(person: IUser): Promise<void>;
    abstract recover(person: IUser): Promise<void>;
}

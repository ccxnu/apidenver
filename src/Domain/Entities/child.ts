export interface IChild
{
    id: string; // UUID como string
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: "M" | "F" | "O" | null;
    gestationalAge: number;
    parentName: string;
    parentContact: string | null;
    createdAt: Date;
    updatedAt: Date | null;
}

export class Child implements IChild
{
    id: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: "M" | "F" | "O" | null;
    gestationalAge: number;
    parentName: string;
    parentContact: string | null;
    createdAt: Date;
    updatedAt: Date | null;

    constructor(data: IChild)
    {
        this.id = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.birthDate = data.birthDate;
        this.gender = data.gender;
        this.gestationalAge = data.gestationalAge;
        this.parentName = data.parentName;
        this.parentContact = data.parentContact;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}

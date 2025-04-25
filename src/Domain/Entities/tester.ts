export interface ITester
{
    id: string; // UUID como string
    fullName: string;
    professionalLicense: string;
    specialty: string;
    email: string;
    createdAt: Date;
}

export class Tester implements ITester
{
    id: string;
    fullName: string;
    professionalLicense: string;
    specialty: string;
    email: string;
    createdAt: Date;

    constructor(data: ITester)
    {
        this.id = data.id;
        this.fullName = data.fullName;
        this.professionalLicense = data.professionalLicense;
        this.specialty = data.specialty;
        this.email = data.email;
        this.createdAt = data.createdAt;
    }
}

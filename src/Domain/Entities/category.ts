export interface ICategory
{
    ctgCategoryId: number; // SERIAL
    name: string;
    description: string | null;
    ageRangeStart: number;
    ageRangeEnd: number;
}

export class Category implements ICategory
{
    ctgCategoryId: number;
    name: string;
    description: string | null;
    ageRangeStart: number;
    ageRangeEnd: number;

    constructor(data: ICategory)
    {
        this.ctgCategoryId = data.ctgCategoryId;
        this.name = data.name;
        this.description = data.description;
        this.ageRangeStart = data.ageRangeStart;
        this.ageRangeEnd = data.ageRangeEnd;
    }
}

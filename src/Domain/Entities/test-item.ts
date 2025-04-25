export interface ITestItem
{
    ttiItemId: number; // SERIAL
    ttiCategoryId: number;
    itemCode: string;
    description: string;
    ageNormMedian: number;
    itemType: "Observado" | "Reportado" | "Examinado";
    order: number;
}

export class TestItem implements ITestItem
{
    ttiItemId: number;
    ttiCategoryId: number;
    itemCode: string;
    description: string;
    ageNormMedian: number;
    itemType: "Observado" | "Reportado" | "Examinado";
    order: number;

    constructor(data: ITestItem)
    {
        this.ttiItemId = data.ttiItemId;
        this.ttiCategoryId = data.ttiCategoryId;
        this.itemCode = data.itemCode;
        this.description = data.description;
        this.ageNormMedian = data.ageNormMedian;
        this.itemType = data.itemType;
        this.order = data.order;
    }
}

export interface IDevelopmentalAlert
{
    dalAlertId: string; // UUID como string
    dalChildId: string; // UUID como string
    dalItemId: number;
    alertType: "Retraso" | "Precaución";
    severity: number;
    recommendations: string;
    createdAt: Date;
}

export class DevelopmentalAlert implements IDevelopmentalAlert
{
    dalAlertId: string;
    dalChildId: string;
    dalItemId: number;
    alertType: "Retraso" | "Precaución";
    severity: number;
    recommendations: string;
    createdAt: Date;

    constructor(data: IDevelopmentalAlert)
    {
        this.dalAlertId = data.dalAlertId;
        this.dalChildId = data.dalChildId;
        this.dalItemId = data.dalItemId;
        this.alertType = data.alertType;
        this.severity = data.severity;
        this.recommendations = data.recommendations;
        this.createdAt = data.createdAt;
    }
}

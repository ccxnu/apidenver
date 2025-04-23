export interface ITestSession
{
    ttsSessionId: string;  // UUID como string
    ttsChildId: string;  // UUID como string
    ttsTesterId: string;  // UUID como string
    testDate: Date;
    correctedAge: number;
    generalNotes: string | null;
    status: "Completado" | "Parcial" | "Pendiente";
    createdAt: Date;
}

export class TestSession implements ITestSession
{
    ttsSessionId: string;
    ttsChildId: string;
    ttsTesterId: string;
    testDate: Date;
    correctedAge: number;
    generalNotes: string | null;
    status: "Completado" | "Parcial" | "Pendiente";
    createdAt: Date;

    constructor(data: ITestSession)
    {
        this.ttsSessionId = data.ttsSessionId;
        this.ttsChildId = data.ttsChildId;
        this.ttsTesterId = data.ttsTesterId;
        this.testDate = data.testDate;
        this.correctedAge = data.correctedAge;
        this.generalNotes = data.generalNotes;
        this.status = data.status;
        this.createdAt = data.createdAt;
    }
}

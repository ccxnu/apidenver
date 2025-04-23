export interface ITestResult
{
    trsResultId: string;  // UUID como string
    trsSessionId: string;  // UUID como string
    trsItemId: number;
    result: "Logrado" | "No logrado" | "No aplicable" | "No observado";
    observations: string | null;
    testTime: string | null;
    attempts: number | null;
}

export class TestResult implements ITestResult
{
    trsResultId: string;
    trsSessionId: string;
    trsItemId: number;
    result: "Logrado" | "No logrado" | "No aplicable" | "No observado";
    observations: string | null;
    testTime: string | null;
    attempts: number | null;

    constructor(data: ITestResult)
    {
        this.trsResultId = data.trsResultId;
        this.trsSessionId = data.trsSessionId;
        this.trsItemId = data.trsItemId;
        this.result = data.result;
        this.observations = data.observations;
        this.testTime = data.testTime;
        this.attempts = data.attempts;
    }
}

export interface IAuditLog
{
    logId: string; // UUID como string
    userId: string | null; // UUID como string, puede ser null
    actionType: string;
    targetId: string | null; // UUID como string, puede ser null
    targetType: string | null;
    ipAddress: string | null;
    userAgent: string | null;
    metadata: object | null;
    createdAt: Date;
}

export class AuditLog implements IAuditLog
{
    logId: string;
    userId: string | null;
    actionType: string;
    targetId: string | null;
    targetType: string | null;
    ipAddress: string | null;
    userAgent: string | null;
    metadata: object | null;
    createdAt: Date;

    constructor(data: IAuditLog)
    {
        this.logId = data.logId;
        this.userId = data.userId;
        this.actionType = data.actionType;
        this.targetId = data.targetId;
        this.targetType = data.targetType;
        this.ipAddress = data.ipAddress;
        this.userAgent = data.userAgent;
        this.metadata = data.metadata;
        this.createdAt = data.createdAt;
    }
}

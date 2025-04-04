export class ResponseProcess
{
    public code: string;
    public result: any;
    public info: string;

    constructor(result?: any)
    {
        this.code = "COD_OK";
        this.result = result ?? {};
        this.info = "El proceso se realizó con exito";
    }
}

export abstract class ITransformer
{
    abstract generateCertificate(certificate: any): Promise<Buffer>;
}

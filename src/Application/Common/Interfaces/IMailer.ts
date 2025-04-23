export abstract class IMailer
{
    abstract sendVerifyEmail(data: any): Promise<void>;
    abstract sendForgotPasswordEmail(data: any): Promise<void>;
}

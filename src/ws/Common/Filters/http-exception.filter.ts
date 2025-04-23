import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter
{
    catch(exception: HttpException, host: ArgumentsHost)
    {
        const response = host.switchToHttp().getResponse<Response>();
        const status = exception.getStatus();

        const error = {
            code: "COD_ERROR_HTTP",
            info: exception.message,
        };

        console.log(exception);

        response.status(status).json(error);
    }
}

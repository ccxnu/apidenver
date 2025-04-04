import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter
{
    catch(exception: HttpException, host: ArgumentsHost)
    {
        const response = host.switchToHttp().getResponse<Response>();
        let status = exception.getStatus();

        // Aquí puedes personalizar la respuesta de acuerdo al tipo de excepción
        var error = {
            code: "COD_ERROR_HTTP",
            info: exception.message,
        };

        console.log(exception);

        response.status(status).json(error);
    }
}

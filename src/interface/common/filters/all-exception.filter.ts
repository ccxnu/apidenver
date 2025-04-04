import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class AllExceptionFilter implements ExceptionFilter
{
    catch(_exception: any, host: ArgumentsHost)
    {
        const response = host.switchToHttp().getResponse<Response>();

        const error = {
            code: "COD_ERROR_SERVICE",
            info: "Ocurrió un error, intenta más tarde.",
        };

        console.log(_exception);

        response.status(500).json(error);
    }
}

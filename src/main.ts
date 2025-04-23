import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { json, urlencoded } from "express";

import { AppModule } from "@ws/app.module";
import { AllExceptionFilter } from "@ws/Common/Filters/all-exception.filter";
import { HttpExceptionFilter } from "@ws/Common/Filters/http-exception.filter";

async function bootstrap()
{
    const app = await NestFactory.create(AppModule, { logger: ["error", "warn"] });

    app.enableCors();
    app.use(json({ limit: "100mb" }));
    app.use(urlencoded({ extended: false, limit: "100mb" }));

    app.useGlobalFilters(new AllExceptionFilter());
    app.useGlobalFilters(new HttpExceptionFilter());

    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    // Base routing
    app.setGlobalPrefix("api");

    await app.listen(3000, "0.0.0.0");
    console.info("Service running ^~^");
}

bootstrap().catch((err) =>
{
    console.error("Init service failed:", err);
    process.exit(1);
});

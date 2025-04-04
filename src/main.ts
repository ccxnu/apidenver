import { NestFactory } from "@nestjs/core";
import { json, urlencoded } from "express";

import { AppModule } from "./app.module";
import { AllExceptionFilter } from "./interface/common/filters/all-exception.filter";
import { HttpExceptionFilter } from "./interface/common/filters/http-exception.filter";

async function bootstrap()
{
    const app = await NestFactory.create(AppModule, {
        logger: ["error", "warn"],
    });

    app.enableCors();
    app.use(json({ limit: "100mb" }));
    app.use(urlencoded({ extended: false, limit: "100mb" }));

    // Filter
    app.useGlobalFilters(new AllExceptionFilter());
    app.useGlobalFilters(new HttpExceptionFilter());

    // Base routing
    app.setGlobalPrefix("api");

    await app.listen(3000, "0.0.0.0");
}

bootstrap().catch((err) =>
{
    console.error("Init service failed:", err);
    process.exit(1);
});

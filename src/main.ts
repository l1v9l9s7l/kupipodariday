// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import "reflect-metadata";

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//     res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
//     next();
//   });
//   await app.listen(3000);
// }
// bootstrap();

import "reflect-metadata";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import helmet from "helmet";
import { AllExceptionsFilter } from "./exceptions/all-exceptions.filter";


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const httpAdapter = app.get(HttpAdapterHost);

  app.use(
    helmet()
    // { crossOriginResourcePolicy: { policy: "cross-origin" } }
  );

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3000);
}
bootstrap();




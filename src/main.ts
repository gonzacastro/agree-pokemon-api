import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExpansionPackModel } from './models/ExpansionPack.Model';
import { RarityModel } from './models/Rarity.Model';
import { TypeModel } from './models/Type.Model';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalFilters(new NotFoundFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Pokemon API')
    .setDescription(
      "Welcome to the API documentation, here you can find out how to consume this humble API. In one hand you have the endpoints under the Title of Poke-cards, there you can see how to perform every API call and what to send or expect from it.\nOn the other hand, you'll see the Schemas section, where you'll be able to see the data structures used, the ones ending in Model referes to the database table, and the rest are DTO used for mapping and validating the requests you'll send. Happy API!",
    )
    .setVersion('1.0')
    .build();
  const options: SwaggerDocumentOptions = {
    extraModels: [RarityModel, TypeModel, ExpansionPackModel],
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();

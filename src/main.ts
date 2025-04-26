import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes( new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted:true,
  }))

  app.enableCors();


  const config = new DocumentBuilder()
    .setTitle("URL Shortner Server")
    .setDescription("API for URL shortening with authentication")
    .setVersion('1.0')
    .addBearerAuth()
    .build()

    const document = SwaggerModule.createDocument(app, config);

    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();

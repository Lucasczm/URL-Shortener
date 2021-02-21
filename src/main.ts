import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Encurtador')
    .setDescription('Encurtador de URL')
    .setVersion('1.0')
    .addTag('encurtador')
    .addTag('/')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = app.get(ConfigService).get('port');
  await app.listen(port);
}
bootstrap();

import { Options, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform:true,
    forbidNonWhitelisted:true,
    transformOptions:{
      enableImplicitConversion:true
    }
 }))

 const options = new DocumentBuilder()
 .setTitle('InTouch Products')
 .setDescription('InTouch Task')
 .setVersion('1.0').addServer('/')
 .build();
 
  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('',app,document);
  await app.listen(3000);
}
bootstrap();

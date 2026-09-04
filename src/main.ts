import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true
  }))
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Lancelot API')
    .setDescription('API para la gestión de usuarios, categorías, competencias y asignaciones deportivas.')
    .setVersion('1.0')
    .addTag('Autenticación')
    .addTag('Usuarios')
    .addTag('Categorías')
    .addTag('Competencias')
    .addTag('Asignaciones a categorías')
    .addTag('Asignaciones a competencias')
    .addTag('Roles')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Token JWT obtenido mediante el endpoint de inicio de sesión.',
    }, 'bearerAuth')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocument);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

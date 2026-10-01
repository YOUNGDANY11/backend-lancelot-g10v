import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? true,
    credentials: true,
  })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Lancelot API')
    .setDescription('API Lancelot Gestion deportiva en Futbol')
    .setVersion('Beta')
    .addTag('Autenticación')
    .addTag('Usuarios')
    .addTag('Categorías')
    .addTag('Competencias')
    .addTag('Asignaciones a categorías')
    .addTag('Asignaciones a competencias')
    .addTag('Partidos')
    .addTag('Roles')
    .addTag('Índice de progreso ponderado')
    .addTag('Señalizaciones de talento')
    .addTag('Configuración de detección de talento')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description:
          'Token JWT obtenido mediante el endpoint de inicio de sesión.',
      },
      'bearerAuth',
    )
    .build()
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api/docs', app, swaggerDocument)
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()

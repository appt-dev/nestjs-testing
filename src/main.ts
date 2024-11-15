import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module.js';
async function bootstrap() {
  const iNestApp: INestApplication<unknown> =
    await NestFactory.create(AppModule);

  const app: NestFastifyApplication =
    await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({
        logger: true,
      }),
    );
  const cors = { allowedHeaders: '*', origin: '*', credentials: true };

  app.enableCors(cors);

  const port: number = 7777;

  const severUrl: string = `http://localhost`;

  await app.listen(port, '0.0.0.0', () =>
    console.info(`🚀 Server ready at ${severUrl}:${port}/graphql`),
  );
}

bootstrap();

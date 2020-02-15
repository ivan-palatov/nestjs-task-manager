import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import config from 'config';
import { ObjectLiteral } from 'typeorm';
import { AppModule } from './app.module';

async function bootstrap() {
  const { port, logger, origin } = config.get<ObjectLiteral>('server');
  const log = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule, { logger });

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin });
    log.log(`Accepting requests from origin ${origin}`);
  }

  const PORT = process.env.PORT ?? port;
  await app.listen(PORT);

  log.log(`Application is listening on port ${PORT}`);
}
bootstrap();

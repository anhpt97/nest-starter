import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cluster from 'cluster';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dotenv/config';
import { availableParallelism } from 'os';
import { AppModule } from './app.module';
import { APP_NAME, NODE_ENV, PORT } from './common/constants';
import { NodeEnv } from './common/enums';
import { i18n } from './common/middlewares';

dayjs.extend(customParseFormat);

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.use(i18n);

  // app.enableCors({ exposedHeaders: 'Content-Disposition' });

  app.setGlobalPrefix('api', {
    exclude: [
      { path: '', method: RequestMethod.GET },
      { path: 'health', method: RequestMethod.GET },
    ],
  });

  if (NODE_ENV !== NodeEnv.Production) {
    SwaggerModule.setup(
      'api-docs',
      app,
      SwaggerModule.createDocument(
        app,
        new DocumentBuilder().setTitle(APP_NAME).addBearerAuth().build(),
      ),
    );
  }

  void app.listen(PORT);
};

if (cluster.isPrimary) {
  [...Array(availableParallelism())].forEach((_, i) =>
    cluster.fork({ NODE_APP_INSTANCE: i }),
  );
} else {
  void bootstrap();
}

import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { TripPlannerModule } from './trip-planner/trip-planner.module';
import * as process from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiErrorFilter } from '@shared/application';

async function bootstrap() {
  const app = await NestFactory.create(TripPlannerModule);
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ApiErrorFilter(httpAdapter));

  const config = new DocumentBuilder()
    .setTitle('Trip Planner API')
    .setDescription('Insert a description here')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();

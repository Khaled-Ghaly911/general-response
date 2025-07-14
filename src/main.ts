import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload-minimal';
import { GqlResponseInterceptor } from 'common/interceptors/transform.interceptor';
import { GraphqlExceptionFilter } from 'common/filters/graphql-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GraphqlExceptionFilter());
  app.useGlobalInterceptors(new GqlResponseInterceptor());

  app.use(
    graphqlUploadExpress({
      maxFileSize: 10_000_000, // 10 MB
      maxFiles: 5,
    }),
  );


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

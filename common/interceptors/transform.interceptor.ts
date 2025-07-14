import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class GqlResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isGraphQL = context.getType<'graphql'>() === 'graphql';
    const gqlCtx = isGraphQL ? GqlExecutionContext.create(context) : null;
    const info = gqlCtx?.getInfo();

    return next.handle().pipe(
      map((res: any) => {
        const isPaginated = res && Array.isArray(res.items) && res.pageInfo;
        
        return {
            status: true,
            statusCode: HttpStatus.OK,
            data: isPaginated ? null : res ?? null,
            paginatedData: isPaginated ? res : undefined,
            message: undefined,
        };
      }),
      catchError((exception: any) =>
        throwError(() => {
          const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

          const message =
            exception?.response?.message ||
            exception?.message ||
            'Internal Server Error';

          return new HttpException(
            {
              status: false,
              statusCode: status,
              message,
              data: null,
              paginatedData: null,
            },
            status,
          );
        }),
      ),
    );
  }
}

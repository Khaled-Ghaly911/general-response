import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';

@Catch()
export class GraphqlExceptionFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        message = (res as any).message || (res as any).error || message;
      }
    }

    // Handle known Postgres errors
    else if (exception?.code) {
      switch (exception.code) {
        case '23505': // Unique violation
          message = exception.detail || 'Duplicate entry';
          break;
        case '23503': // Foreign key violation
          message = 'Referenced entity does not exist';
          break;
        case '23502': // Not-null violation
          message = 'Missing required field';
          break;
        case '22P02': // Invalid input syntax (e.g., UUID)
          message = 'Invalid input format';
          break;
        case '22001': // Value too long for column
          message = 'Input is too long';
          break;
        default:
          message = exception.message || message;
      }
    }

    // Fallback: just use message if available
    else if (exception?.message) {
      message = exception.message;
    }

    return {
      status: false,
      statusCode,
      message,
      data: null,
      paginatedData: null,
    };
  }
}


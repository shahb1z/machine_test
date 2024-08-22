import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '../services/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    constructor(
        @Inject(forwardRef(() => LoggerService))
        private readonly loggerService: LoggerService,
      ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: typeof exceptionResponse === 'string' ? exceptionResponse : (exceptionResponse as any).message || 'something went wrong , error occurred',
    };


 

    response.status(status).json(errorResponse);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerService {
  private readonly logger = new Logger(LoggerService.name);
  private readonly logFilePath = path.join(__dirname, '../../logs/app.log');

  constructor() {
    // Ensure the log file directory exists
    if (!fs.existsSync(path.dirname(this.logFilePath))) {
      fs.mkdirSync(path.dirname(this.logFilePath), { recursive: true });
    }
  }

  log(message: string) {
    this.logger.log(message);
    this.writeToFile('LOG', message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, trace);
    this.writeToFile('ERROR', `${message}\n${trace}`);
  }

  warn(message: string) {
    this.logger.warn(message);
    this.writeToFile('WARN', message);
  }

  private writeToFile(level: string, message: string) {
    const logMessage = `${new Date().toISOString()} [${level}] ${message}\n`;
    fs.appendFile(this.logFilePath, logMessage, (err) => {
      if (err) this.logger.error('Failed to write log to file', err.stack);
    });
  }
}

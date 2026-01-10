// utils/logger.js
import fs from 'fs';
import path from 'path';

class Logger {
  constructor() {
    this.logLevel = {
      DEBUG: 0,
      INFO: 1,
      WARN: 2,
      ERROR: 3,
    };

    this.currentLogLevel = this.logLevel.INFO;
    this.logsDir = './logs';

    // Create logs directory if it doesn't exist
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir, { recursive: true });
    }

    this.logFile = path.join(this.logsDir, `test-${new Date().toISOString().split('T')[0]}.log`);
  }

  setLogLevel(level) {
    if (this.logLevel[level]) {
      this.currentLogLevel = this.logLevel[level];
    }
  }

  writeLog(level, message, data = null) {
    const timestamp = new Date().toISOString();
    let logMessage = `[${timestamp}] [${level}] ${message}`;
    
    if (data) {
      logMessage += ` | ${JSON.stringify(data)}`;
    }

    console.log(logMessage);

    // Write to file
    try {
      fs.appendFileSync(this.logFile, logMessage + '\n');
    } catch (error) {
      console.error('Error writing to log file:', error);
    }
  }

  debug(message, data = null) {
    if (this.currentLogLevel <= this.logLevel.DEBUG) {
      this.writeLog('DEBUG', message, data);
    }
  }

  info(message, data = null) {
    if (this.currentLogLevel <= this.logLevel.INFO) {
      this.writeLog('INFO', message, data);
    }
  }

  warn(message, data = null) {
    if (this.currentLogLevel <= this.logLevel.WARN) {
      this.writeLog('WARN', message, data);
    }
  }

  error(message, data = null) {
    if (this.currentLogLevel <= this.logLevel.ERROR) {
      this.writeLog('ERROR', message, data);
    }
  }
}

export const logger = new Logger();
export default Logger;

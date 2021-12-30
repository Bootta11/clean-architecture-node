import appRoot from 'app-root-path'
import winston, { Logger } from 'winston'

class WinstonLogger {
  private readonly logger

  constructor () {
    const options = {
      file: {
        level: 'info',
        filename: `${String(appRoot)}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false
      },
      console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
      }
    }

    this.logger = winston.createLogger({
      transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
      ],
      exitOnError: false // do not exit on handled exceptions
    })

    this.logger.stream = {
      write: (message) => {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        this.logger.info(message)
      }
    }
  }

  public getLogger (): Logger {
    return this.logger
  }
}

const winstonLogger = new WinstonLogger()

export default winstonLogger

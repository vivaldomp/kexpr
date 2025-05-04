import pino from 'pino';

const logger = pino({
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'HH:MM:ss',
    },
  },
});

function setLogLevel(level: pino.Level): void {
  logger.level = level;
  logger.info(`Level log modified to: ${level}`);
}

export { logger, setLogLevel };

import { logger, setLogLevel } from './utils';

jest.mock('pino', () => {
  const mockLogger = {
    level: 'info',
    info: jest.fn(),
  };
  return jest.fn(() => mockLogger);
});

describe('setLogLevel', () => {
  it('should update the logger level', () => {
    const newLevel = 'debug';
    setLogLevel(newLevel as any);

    expect(logger.level).toBe(newLevel);
  });

  it('should log the correct message when log level is updated', () => {
    const newLevel = 'warn';
    setLogLevel(newLevel as any);

    expect(logger.info).toHaveBeenCalledWith(
      `Level log modified to: ${newLevel}`,
    );
  });
});

import { customFunctions } from './functions';

describe('customFunctions', () => {
  describe('versionCheck', () => {
    test('should return true for a valid version condition', () => {
      expect(customFunctions.versionCheck('1.2.3', '>=1.0.0')).toBe(true);
    });

    test('should return false for an invalid version condition', () => {
      expect(customFunctions.versionCheck('1.2.3', '<1.0.0')).toBe(false);
    });
  });

  describe('randomPerc', () => {
    test('should return true for a valid percentage range', () => {
      expect(customFunctions.randomPerc(10, 2000, 123)).toBe(true);
    });

    test('should return false for an invalid percentage range', () => {
      expect(customFunctions.randomPerc(0, 2000, 123)).toBe(false);
    });
  });

  describe('randomPercRange', () => {
    test('should return true for a value within the range', () => {
      expect(customFunctions.randomPercRange(0, 10, 2000, 123)).toBe(true);
    });

    test('should return false for a value outside the range', () => {
      expect(customFunctions.randomPercRange(20, 30, 2000, 123)).toBe(false);
    });
  });

  describe('after', () => {
    test('should return true if the current date is after the given date', () => {
      expect(customFunctions.after('2000-01-01')).toBe(true);
    });

    test('should throw an error for an invalid date', () => {
      expect(() => customFunctions.after('invalid-date')).toThrow(
        'Date invalid-date is invalid.',
      );
    });
  });

  describe('before', () => {
    test('should return true if the current date is before the given date', () => {
      expect(customFunctions.before('3000-01-01')).toBe(true);
    });

    test('should throw an error for an invalid date', () => {
      expect(() => customFunctions.before('invalid-date')).toThrow(
        'Date invalid-date is invalid.',
      );
    });
  });

  describe('match', () => {
    test('should return true if the value matches the regex', () => {
      expect(customFunctions.match('hello', '^h.*o$')).toBe(true);
    });

    test('should return false if the value does not match the regex', () => {
      expect(customFunctions.match('hello', '^a.*z$')).toBe(false);
    });
  });

  describe('concatString', () => {
    test('should concatenate multiple strings', () => {
      expect(customFunctions.concatString('hello', ' ', 'world')).toBe(
        'hello world',
      );
    });
  });

  describe('stripWhitespaces', () => {
    test('should remove all whitespaces from a string', () => {
      expect(customFunctions.stripWhitespaces(' h e l l o ')).toBe('hello');
    });
  });
});

import { Evaluator } from './evaluator';
import { customFunctions } from './functions';
import { Jexl } from 'jexl';

jest.mock('./functions', () => ({
  customFunctions: {
    func1: jest.fn(),
    func2: jest.fn(),
  },
}));

jest.mock('jexl');

describe('Evaluator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should inject functions into Jexl during construction', () => {
    const mockAddFunction = jest.fn();
    (Jexl as jest.Mock).mockImplementation(() => ({
      addFunction: mockAddFunction,
    }));

    const evaluator = Evaluator.create();

    expect(evaluator).toBeInstanceOf(Evaluator);

    expect(mockAddFunction).toHaveBeenCalledTimes(
      Object.keys(customFunctions).length,
    );
    for (const key in customFunctions) {
      expect(mockAddFunction).toHaveBeenCalledWith(key, customFunctions[key]);
    }
  });
});

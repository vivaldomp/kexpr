import { CompiledExpression, Context, EvaluatorOptions } from './types';
describe('Types Validation', () => {
  test('Context type validation', () => {
    const mockContext: Context = {
      input: {
        key1: 'value1',
        key2: 42,
      },
    };

    expect(mockContext).toHaveProperty('input');
    expect(typeof mockContext.input).toBe('object');
    expect(mockContext.input.key1).toBe('value1');
    expect(mockContext.input.key2).toBe(42);
  });
  test('CompiledExpression resolves to true', async () => {
    const mockCompiledExpression: CompiledExpression = async (
      context: Context,
    ) => {
      return context.input.key === 'value';
    };

    const mockContext: Context = {
      input: { key: 'value' },
    };

    const result = await mockCompiledExpression(mockContext);
    expect(result).toBe(true);
  });

  test('CompiledExpression resolves to false', async () => {
    const mockCompiledExpression: CompiledExpression = async (
      context: Context,
    ) => {
      return context.input.key === 'value';
    };

    const mockContext: Context = {
      input: { key: 'otherValue' },
    };

    const result = await mockCompiledExpression(mockContext);
    expect(result).toBe(false);
  });

  test('EvaluatorOptions with customFunctions', () => {
    const mockEvaluatorOptions: EvaluatorOptions = {
      customFunctions: {
        add: (a: number, b: number) => a + b,
        multiply: (a: number, b: number) => a * b,
      },
    };

    expect(mockEvaluatorOptions.customFunctions).toBeDefined();
    expect(typeof mockEvaluatorOptions.customFunctions?.add).toBe('function');
    expect(typeof mockEvaluatorOptions.customFunctions?.multiply).toBe(
      'function',
    );
    expect(mockEvaluatorOptions.customFunctions?.add(2, 3)).toBe(5);
    expect(mockEvaluatorOptions.customFunctions?.multiply(2, 3)).toBe(6);
  });

  test('EvaluatorOptions without customFunctions', () => {
    const mockEvaluatorOptions: EvaluatorOptions = {};

    expect(mockEvaluatorOptions.customFunctions).toBeUndefined();
  });
});

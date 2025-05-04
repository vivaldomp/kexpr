import { Evaluator } from './index';
import type { Context, CompiledExpression, EvaluatorOptions } from './index';

describe('index.ts', () => {
  test('should export Evaluator', () => {
    expect(Evaluator).toBeDefined();
  });

  test('should export types Context, CompiledExpression, and EvaluatorOptions', () => {
    const context: Context = { input: {} }; // Example usage to ensure type is accessible
    const compiledExpression: CompiledExpression = async (context: Context) => true; // Example usage
    const evaluatorOptions: EvaluatorOptions = {}; // Example usage

    expect(context).toBeDefined();
    expect(compiledExpression).toBeDefined();
    expect(evaluatorOptions).toBeDefined();
  });
});
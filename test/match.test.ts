import { Evaluator } from '../src/evaluator';

describe('match Function', () => {
  test('ok', async () => {
    const evaluator = Evaluator.create();
    const expression = 'match(input.customerId, "^[0-9]+$")';
    const context = {
      input: {
        customerId: 123,
      },
    };

    const result = await evaluator.runExpr(expression, context);
    expect(result).toBe(true);
  });

  test('fail', async () => {
    const evaluator = Evaluator.create();
    const expression = 'match(input.customerId, "^[0-9]+$")';
    const context = {
      input: {
        customerId: 'ef0ab310-4b2c-4a0e-8f3d-1f5a7b6c9d3e',
      },
    };

    const result = await evaluator.runExpr(expression, context);
    expect(result).toBe(false);
  });
});

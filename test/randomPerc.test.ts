import { Evaluator } from '../src/evaluator';

describe('randomPerc Function', () => {
  test('ok', async () => {
    const evaluator = Evaluator.create();
    // fromPerc: 0, toPerc: 6553, hv: 5808
    const expression = 'randomPerc(10, input.customerId, 123)';
    const context = {
      input: {
        customerId: 2000,
      },
    };

    const result = await evaluator.runExpr(expression, context);
    expect(result).toBe(true);
  });

  test('fail', async () => {
    const evaluator = Evaluator.create();
    // fromPerc: 0, toPerc: 6553, hv: 45844
    const expression = 'randomPerc(10, input.customerId, 123)';
    const context = {
      input: {
        customerId: 100,
      },
    };

    const result = await evaluator.runExpr(expression, context);
    expect(result).toBe(false);
  });
});

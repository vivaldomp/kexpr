import { Evaluator } from '../src/evaluator';

describe('conditionFunc', () => {
  test('ok', async () => {
    const evaluator = Evaluator.create();
    const expression =
      'input.customerId == 123 && match(input.customerId, "^[0-9]+$")';
    const context = {
      input: {
        customerId: 123,
      },
    };
    const conditionFunc = evaluator.compileExpr(expression);
    const result = await conditionFunc(context);
    expect(result).toBe(true);
  });
});

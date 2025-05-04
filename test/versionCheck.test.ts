import { Evaluator } from '../src/evaluator';
describe('versionCheck Function', () => {
  test('ok', async () => {
    const evaluator = Evaluator.create();
    const expression = 'versionCheck(input.version, ">=1.0.0 <2.0.0")';
    const context = {
      input: {
        version: '1.2.3',
        range: '>=1.0.0 <2.0.0',
      },
    };

    const result = await evaluator.runExpr(expression, context);
    expect(result).toBe(true);
  });

  test('fail', async () => {
    const evaluator = Evaluator.create();
    const expression = 'versionCheck(input.version, ">=1.0.0 <2.0.0")';
    const context = {
      input: {
        version: '2.2.3',
        range: '>=1.0.0 <2.0.0',
      },
    };

    const result = await evaluator.runExpr(expression, context);
    expect(result).toBe(false);
  });
  test('invalid', async () => {
    const evaluator = Evaluator.create();
    const expression = 'versionCheck(input.version, ">=1.0.0 <2.0.0")';
    const context = {
      input: {
        version: 'invalid',
        range: '>=1.0.0 <2.0.0',
      },
    };

    const result = await evaluator.runExpr(expression, context);
    expect(result).toBe(false);
  });
});

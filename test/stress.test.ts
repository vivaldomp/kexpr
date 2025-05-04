import { Evaluator } from '../src/evaluator';

describe('sandjs stress test', () => {
  test('1000 parallel version checks', async () => {
    const evaluator = Evaluator.create();

    const expression = 'versionCheck(input.version, ">=1.0.0 <2.0.0")';

    const contextTemplate = {
      input: {
        version: '1.2.3',
        range: '>=1.0.0 <2.0.0',
      },
    };

    const tasks = Array.from({ length: 1000 }, () =>
      evaluator.runExpr(expression, { ...contextTemplate }),
    );

    const results = await Promise.all(tasks);

    console.log('Expr processed:', results.length);
    results.forEach((result) => {
      expect(result).toBe(true);
    });
  }, 10_000);
});

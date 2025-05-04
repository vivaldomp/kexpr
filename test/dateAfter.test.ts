import { Evaluator } from '../src/evaluator';
import { EvaluationError } from '../src/errors';

describe('dateAfter Function', () => {
  test('ok', async () => {
    const evaluator = Evaluator.create();
    const expression = 'after("2023-11-09T23:32:21+00:00")';

    const result = await evaluator.runExpr(expression);
    expect(result).toBe(true);
  });

  test('fail', async () => {
    const evaluator = Evaluator.create();
    const expression = 'after("2099-11-09T23:32:21+00:00")';

    const result = await evaluator.runExpr(expression);
    expect(result).toBe(false);
  });

  test('throws EvaluationError for null input', async () => {
    const evaluator = Evaluator.create();
    const expression = 'after(null)';

    await expect(evaluator.runExpr(expression)).rejects.toThrow(
      EvaluationError,
    );
  });

  test('throws EvaluationError for empty string', async () => {
    const evaluator = Evaluator.create();
    const expression = 'after("")';

    await expect(evaluator.runExpr(expression)).rejects.toThrow(
      EvaluationError,
    );
  });

  test('throws EvaluationError for missing argument', async () => {
    const evaluator = Evaluator.create();
    const expression = 'after()';

    await expect(evaluator.runExpr(expression)).rejects.toThrow(
      EvaluationError,
    );
  });
});

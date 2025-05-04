import { EvaluationError } from '../src/errors';
import { Evaluator } from '../src/evaluator';
describe('sandjs', () => {
  test('invalid function', async () => {
    const evaluator = Evaluator.create();
    const expression = 'invalidFunction';
    const context = {
      input: {
        text: 'invalid text',
      },
    };

    await expect(evaluator.runExpr(expression, context)).rejects.toThrow(
      EvaluationError,
    );
  });
});

import { Evaluator } from '../src/evaluator';

describe('rawExpressions', () => {
  test('one input', async () => {
    const evaluator = Evaluator.create();
    const expression = 'input.text == "text"';
    const context = {
      input: {
        text: 'text',
      },
    };

    const result = await evaluator.runExpr(expression, context);
    expect(result).toBe(true);
  });

  test('two inputs with "and" operator', async () => {
    const evaluator = Evaluator.create();
    const expression = 'input.text == "text" && input.number > 0';
    const context = {
      input: {
        text: 'text',
        number: 1,
      },
    };

    const result = await evaluator.runExpr(expression, context);
    expect(result).toBe(true);
  });

  test('two inputs with "or" operator', async () => {
    const evaluator = Evaluator.create();
    const expression = 'input.text == "text" || input.number > 0';
    const context = {
      input: {
        text: 'text',
        number: 1,
      },
    };

    const result = await evaluator.runExpr(expression, context);
    expect(result).toBe(true);
  });

  test('alone truthy', async () => {
    const evaluator = Evaluator.create();
    const expression = 'true';

    const result = await evaluator.runExpr(expression);
    expect(result).toBe(true);
  });
});

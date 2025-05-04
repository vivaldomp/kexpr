import { Jexl } from 'jexl';
import { customFunctions } from './functions';
import { EvaluationError } from './errors';
import { CompiledExpression, Context, EvaluatorOptions } from './types';
import { logger } from './utils';

export class Evaluator {
  private static instance: Evaluator;
  private jexl = new Jexl();

  private constructor(options?: EvaluatorOptions) {
    logger.info('Initializing Evaluator...');

    if (options?.logLevel) {
      logger.info(`Setting log level to: ${options.logLevel}`);
      logger.level = options.logLevel;
    }

    const mergedFunctions = {
      ...customFunctions,
      ...(options?.customFunctions || {}),
    };

    for (const key in mergedFunctions) {
      logger.debug(`Injecting function: ${key}`);
      this.jexl.addFunction(key, mergedFunctions[key]);
    }
  }

  public static create(options?: EvaluatorOptions): Evaluator {
    return new Evaluator(options);
  }

  public async runExpr(
    expression: string,
    context?: Context,
  ): Promise<boolean> {
    logger.debug(`Running expression: ${expression}`);
    try {
      const result = await this.jexl.eval(expression, context);
      logger.debug(`Result of the expression ${expression}: ${result}`);
      if (typeof result !== 'boolean') {
        logger.debug(
          `Expression did not return a boolean value: ${expression}`,
        );
        throw new EvaluationError(
          `Expression did not return a boolean value: ${expression}`,
        );
      }
      return result;
    } catch (error) {
      logger.debug(`Error evaluating expression: ${expression}`);
      throw new EvaluationError(
        `Error evaluating expression: ${expression}. Error: ${error}`,
      );
    }
  }

  public compileExpr(expr: string): CompiledExpression {
    return async (context: Context) => {
      return this.runExpr(expr, context);
    };
  }
}

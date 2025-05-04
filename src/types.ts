import pino from 'pino';

export type Context = {
  input: Record<string, any>;
};

export type CompiledExpression = (context: Context) => Promise<boolean>;

export interface EvaluatorOptions {
  customFunctions?: Record<string, (...args: any[]) => any>;
  logLevel?: pino.Level;
}

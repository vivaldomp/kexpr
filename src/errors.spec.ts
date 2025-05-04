import { EvaluationError } from './errors';
describe('errors', () => {
  test('EvaluationError', () => {
    const error = new EvaluationError('Test error');
    expect(error).toBeInstanceOf(EvaluationError);
    expect(error.name).toBe('EvaluationError');
    expect(error.message).toBe('Test error');
  });
});

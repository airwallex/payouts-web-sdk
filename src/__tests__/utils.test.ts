import { resolveStaticOrigin } from '../utils';

describe('resolveStaticOrigin', () => {
  test('correct origin', () => {
    expect(resolveStaticOrigin('staging')).toBe(
      'https://static-staging.airwallex.com'
    );
  });
});

import { RequestContextInterceptor } from './request-context.interceptor';

describe('RequestContextInterceptor', () => {
  it('should be defined', () => {
    expect(new RequestContextInterceptor()).toBeDefined();
  });
});

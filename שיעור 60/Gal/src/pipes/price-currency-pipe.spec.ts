import { PriceCurrencyPipe } from './price-currency-pipe';

describe('PriceCurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new PriceCurrencyPipe();
    expect(pipe).toBeTruthy();
  });
});

import { Currency, convertCurrency, getExchangeRate } from "../index";

describe("Currency Conversion Package", () => {
  describe("Currency enum", () => {
    it("should contain common currencies", () => {
      expect(Currency).toBeDefined();
      expect(Currency.USD).toBeDefined();
      expect(Currency.EUR).toBeDefined();
      expect(Currency.GBP).toBeDefined();
    });

    it("should not contain cryptocurrencies", () => {
      const currencyValues = Object.values(Currency);
      expect(currencyValues).not.toContain("BTC");
      expect(currencyValues).not.toContain("ETH");
    });
  });

  describe("getExchangeRate", () => {
    it("should return a valid exchange rate", async () => {
      const rate = await getExchangeRate(Currency.EUR, Currency.USD);
      expect(rate).toBeGreaterThan(0);
      expect(typeof rate).toBe("number");
    });

    it("should be consistent with reverse rate", async () => {
      const rate1 = await getExchangeRate(Currency.EUR, Currency.USD);
      const rate2 = await getExchangeRate(Currency.USD, Currency.EUR);
      expect(Math.abs(rate1 * rate2 - 1)).toBeLessThan(0.0001);
    });
  });

  describe("convertCurrency", () => {
    it("should convert currency correctly", async () => {
      const amount = 100;
      const rate = await getExchangeRate(Currency.EUR, Currency.USD);
      const converted = await convertCurrency(
        amount,
        Currency.EUR,
        Currency.USD
      );
      expect(converted).toBeCloseTo(amount * rate, 4);
    });

    it("should handle zero amount", async () => {
      const converted = await convertCurrency(0, Currency.EUR, Currency.USD);
      expect(converted).toBe(0);
    });

    it("should handle same currency conversion", async () => {
      const amount = 100;
      const converted = await convertCurrency(
        amount,
        Currency.USD,
        Currency.USD
      );
      expect(converted).toBe(amount);
    });
  });
});

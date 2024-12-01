/**
 * Represents all supported currency codes.
 * This enum is automatically updated daily based on the latest currency data.
 */
export enum Currency {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  JPY = "JPY",
  AUD = "AUD",
  CAD = "CAD",
  CHF = "CHF",
  CNY = "CNY",
  HKD = "HKD",
  NZD = "NZD",
  SEK = "SEK",
  KRW = "KRW",
  SGD = "SGD",
  NOK = "NOK",
  MXN = "MXN",
  INR = "INR",
  RUB = "RUB",
  ZAR = "ZAR",
  TRY = "TRY",
  BRL = "BRL",
}

/**
 * Represents a currency conversion rate between two currencies.
 */
export interface CurrencyRate {
  from: Currency;
  to: Currency;
  rate: number;
}

/**
 * Type for the currency rates JSON file format.
 * Keys are in the format "USD/EUR" (from/to).
 */
export type CurrencyRatesData = {
  [key: string]: number;
};

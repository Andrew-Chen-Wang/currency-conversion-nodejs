# currency-converted-data

A TypeScript package that provides easy access to daily updated currency conversion rates.

## Installation

```bash
npm install currency-converted-data
# or
pnpm add currency-converted-data
# or
yarn add currency-converted-data
```

## Usage

```typescript
import { convertCurrency, getExchangeRate, Currency } from 'currency-converted-data';

// Convert 100 USD to EUR
const euros = await convertCurrency(100, Currency.USD, Currency.EUR);
console.log(`100 USD = ${euros} EUR`);

// Get current exchange rate between USD and EUR
const rate = await getExchangeRate(Currency.USD, Currency.EUR);
console.log(`1 USD = ${rate} EUR`);
```

## Features

- Daily updated currency conversion rates from OANDA
- TypeScript enum for type-safe currency codes
- Simple API for currency conversion and exchange rate lookup
- Automatically fetches latest rates from GitHub releases

## Supported Currencies

The package supports all major world currencies, including:
USD, EUR, GBP, JPY, AUD, CAD, CHF, CNY, HKD, NZD, SEK, KRW, SGD, NOK, MXN, INR, RUB, ZAR, TRY, BRL, and more.

## Data Source

Currency conversion rates are updated daily from [currency-conversions](https://github.com/Andrew-Chen-Wang/currency-conversions) GitHub repository releases.

## License

MIT

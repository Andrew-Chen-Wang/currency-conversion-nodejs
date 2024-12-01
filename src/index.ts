import { Currency, CurrencyRate, CurrencyRatesData } from "./types";

let currencyRates: CurrencyRatesData | null = null;

/**
 * Fetches the latest currency rates from the GitHub release.
 * @returns Promise that resolves when rates are loaded
 */
async function loadLatestRates(): Promise<void> {
  if (currencyRates) return;

  try {
    const response = await fetch(
      "https://api.github.com/repos/Andrew-Chen-Wang/currency-conversions/releases/latest"
    );
    const release = await response.json();

    // Find the currency-rates.json asset
    const ratesAsset = release.assets.find(
      (asset: { name: string }) => asset.name === "currency-rates.json"
    );

    if (!ratesAsset) {
      throw new Error("Currency rates asset not found in latest release");
    }

    const ratesResponse = await fetch(ratesAsset.browser_download_url);
    currencyRates = await ratesResponse.json();
  } catch (error) {
    throw new Error(`Failed to load currency rates: ${error.message}`);
  }
}

/**
 * Gets the current exchange rate between two currencies.
 * @param from Source currency
 * @param to Target currency
 * @returns Promise resolving to the exchange rate
 */
export async function getExchangeRate(
  from: Currency,
  to: Currency
): Promise<number> {
  await loadLatestRates();

  if (!currencyRates) {
    throw new Error("Currency rates not loaded");
  }

  const key = `${from}/${to}`;
  const rate = currencyRates[key];

  if (typeof rate !== "number") {
    throw new Error(`Exchange rate not found for ${key}`);
  }

  return rate;
}

/**
 * Converts an amount from one currency to another.
 * @param amount Amount to convert
 * @param from Source currency
 * @param to Target currency
 * @returns Promise resolving to the converted amount
 */
export async function convertCurrency(
  amount: number,
  from: Currency,
  to: Currency
): Promise<number> {
  const rate = await getExchangeRate(from, to);
  return amount * rate;
}

// Re-export types and enum
export { Currency, type CurrencyRate } from "./types";

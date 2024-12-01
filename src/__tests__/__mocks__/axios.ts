const mockRates = {
  "EUR/USD": 1.0922,
  "USD/EUR": 0.9156,
  "GBP/USD": 1.2641,
  "USD/GBP": 0.7911,
  "USD/USD": 1.0,
};

const mockRelease = {
  assets: [
    {
      name: "currency-rates.json",
      browser_download_url: "https://example.com/rates.json",
    },
  ],
};

export default {
  get: jest.fn((url: string) => {
    if (url.includes("releases/latest")) {
      return Promise.resolve({ data: mockRelease });
    }
    if (url.includes("rates.json")) {
      return Promise.resolve({ data: mockRates });
    }
    return Promise.reject(new Error("Not found"));
  }),
};

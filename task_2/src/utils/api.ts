import type { ApiResponse, CurrencyRate } from './types';

async function fetchData(currency: string): Promise<CurrencyRate> {
  try {
    const response = await fetch(
      `https://open.er-api.com/v6/latest/${currency}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    console.log(data);
    return data.rates;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}

export default fetchData;

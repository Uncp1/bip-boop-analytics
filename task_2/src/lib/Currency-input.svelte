<script lang="ts">
  import { onMount } from 'svelte';
  import fetchData from '../utils/api';
  import type { CurrencyRate } from '../utils/types';
  import SearchBar from './Search-bar.svelte';
  import { firstCurrencyOption, secondCurrencyOption } from './stores';

  let conversionRates: CurrencyRate = {};
  let amount = 0;

  const fetchConversionRates = async (currency: string) => {
    conversionRates = await fetchData(currency);
  };

  //fetchConversionRates при инициализации и изменении первой валюты
  onMount(() => {
    fetchConversionRates($firstCurrencyOption);
  });

  $: if ($firstCurrencyOption) {
    fetchConversionRates($firstCurrencyOption);
  }

  $: convertedAmount =
    $secondCurrencyOption && conversionRates[$secondCurrencyOption]
      ? (amount * conversionRates[$secondCurrencyOption]).toFixed(2)
      : 0;
</script>

<div>
  <label for="currency">Currency:</label>
  <SearchBar selectedOption="{1}" />

  <label for="currency">Currency:</label>
  <SearchBar selectedOption="{2}" />

  <label for="amount">Amount:</label>
  <input
    id="amount"
    type="number"
    bind:value="{amount}"
    placeholder="Enter amount"
  />
  {#if secondCurrencyOption && conversionRates[$secondCurrencyOption]}
    <p>Converted Amount: {convertedAmount}</p>
  {/if}
</div>

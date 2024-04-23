<script lang="ts">
  import { onMount } from 'svelte';
  import fetchData from '../utils/api';
  import type { CurrencyRate } from '../utils/types';
  import SearchBar from './Search-bar.svelte';
  import { selectedOption } from './stores';

  let conversionRates: CurrencyRate = {};
  $: selectedCurrency = $selectedOption;
  let amount = 0;

  onMount(async () => {
    conversionRates = await fetchData('USD');
    console.log(conversionRates);
  });
  $: convertedAmount =
    selectedCurrency && conversionRates[selectedCurrency]
      ? (amount * conversionRates[selectedCurrency]).toFixed(2)
      : 0;
</script>

<div>
  <label for="currency">Currency:</label>
  <SearchBar />

  <label for="currency">Currency:</label>
  <SearchBar />

  <label for="amount">Amount:</label>
  <input
    id="amount"
    type="number"
    bind:value="{amount}"
    placeholder="Enter amount"
  />
  {#if selectedCurrency && conversionRates[selectedCurrency]}
    <p>Converted Amount: {convertedAmount}</p>
  {/if}
</div>

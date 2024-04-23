<script lang="ts">
  import { onMount } from 'svelte';
  import fetchData from '../utils/api';
  import type { CurrencyRate } from '../utils/types';

  let conversionRates: CurrencyRate = {};
  let selectedCurrency = '';
  let amount = 0;

  onMount(async () => {
    conversionRates = await fetchData('USD');
    console.log(conversionRates);
  });
  $: convertedAmount =
    selectedCurrency && conversionRates[selectedCurrency]
      ? amount * conversionRates[selectedCurrency]
      : 0;
</script>

<div>
  <label for="currency">Currency:</label>
  <input
    id="currency"
    type="text"
    bind:value="{selectedCurrency}"
    placeholder="Enter currency code"
  />

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

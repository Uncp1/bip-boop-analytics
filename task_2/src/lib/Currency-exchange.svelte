<script lang="ts">
  import { onMount } from 'svelte';
  import fetchData from '../utils/api';
  import type { CurrencyRate } from '../utils/types';
  import SearchBar from './Search-bar.svelte';
  import { firstCurrencyOption, secondCurrencyOption } from './stores';
  import SwapIcon from '../../public/arrows.svg';

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

  const handleSwap = () => {
    const swap = $firstCurrencyOption;
    firstCurrencyOption.set($secondCurrencyOption);
    secondCurrencyOption.set(swap);
  };
</script>

<section>
  <div class="input-container">
    <label for="currency">У меня есть</label>
    <SearchBar selectedOption={1} />
    <label for="amount">Amount:</label>
    <input
      id="amount"
      type="number"
      bind:value={amount}
      placeholder="Enter amount"
    />
  </div>

  <button on:click={handleSwap}>
    <img src={SwapIcon} alt="Click me" />
    click me</button
  >

  <div class="input-container">
    <label for="currency"> Хочу приобрести</label>
    <SearchBar selectedOption={2} />

    {#if secondCurrencyOption && conversionRates[$secondCurrencyOption]}
      <p>Converted Amount: {convertedAmount}</p>
    {/if}
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    gap: 12px;
  }

  button {
    max-width: 60px;
  }
  .input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  @media (max-width: 540px) {
    section {
      flex-direction: column;
      gap: 24px;
    }
  }
</style>

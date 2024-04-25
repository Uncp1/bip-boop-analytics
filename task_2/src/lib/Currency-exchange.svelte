<script lang="ts">
  import { onMount } from 'svelte';
  import fetchData from '../utils/api';
  import type { CurrencyRate } from '../utils/types';
  import CurrencyInput from './Currency-input.svelte';
  import { firstCurrencyOption, secondCurrencyOption } from './stores';
  import SwapIcon from '../../public/arrows.svg';

  let conversionRates: CurrencyRate = {};
  let amount = 1;

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

  const limitInputLength = (event) => {
    const target = event.target as HTMLInputElement;
    if (target.value.length > 12) {
      target.value = target.value.slice(0, 12);
    }
  };
</script>

<section>
  <div class="input-container">
    <h2>У меня есть</h2>
    <CurrencyInput selectedOption={1} />
    <label for="amount">Сумма:</label>
    <input
      id="amount"
      type="number"
      bind:value={amount}
      on:input={limitInputLength}
    />
  </div>

  <button on:click={handleSwap}>
    <img src={SwapIcon} alt="Click me" />
  </button>

  <div class="input-container">
    <h2>Хочу приобрести</h2>
    <CurrencyInput selectedOption={2} />

    <p>Конвертированная сумма:</p>
    <p>{convertedAmount}</p>
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
    width: 240px;
  }

  @media (max-width: 540px) {
    section {
      flex-direction: column;
      gap: 24px;
    }

    button {
    transform: rotate(90deg);
 }
  }
</style>

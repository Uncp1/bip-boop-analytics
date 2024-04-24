<script lang="ts">
  import CurrencyInput from './lib/Currency-exchange.svelte';
  import SearchBar from './lib/Search-bar.svelte';
</script>

<body>
  <header class="mx-0 bg-blue-600 p-4 text-center text-white">
    <h1 class="text-4xl">Курс валют</h1>
  </header>
  <main class="mx-0 h-screen bg-slate-200 p-4 pt-8 text-center">
    <CurrencyInput />
  </main>
</body>

<style lang="postcss">
  h1 {
    color: rgb(var(--svelte-rgb));
  }
</style>

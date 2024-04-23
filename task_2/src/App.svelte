<script lang="ts">
  import CurrencyInput from './lib/Currency-input.svelte';
  import SearchBar from './lib/Search-bar.svelte';
  const buba = 'cdwecew';
</script>

<main class="mx-0 p-4 text-center">
  <h1>Welcome to Svelte</h1>

  <CurrencyInput />
</main>

<style lang="postcss">
  :root {
    --svelte-rgb: 255, 62, 0;
  }

  h1 {
    color: rgb(var(--svelte-rgb));
  }
</style>

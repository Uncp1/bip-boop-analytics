<script>
  export let text;
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function selectOption() {
    dispatch('select', text);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      selectOption();
    }
  }
</script>

<div on:click|preventDefault={selectOption} on:keydown={handleKeyDown}>
  {text}
</div>

<style>
  div {
    color: black;
    padding: 12px 16px;
    display: block;
  }

  div:hover {
    background-color: #ddd;
  }
</style>

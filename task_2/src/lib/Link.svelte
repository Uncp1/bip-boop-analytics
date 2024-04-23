<script>
  export let text;
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
 
  function selectOption() {
     dispatch('select', text);
  }
 </script>
 
 <div on:click|preventDefault="{selectOption}">{text}</div>

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

<script>
  import Link from './Link.svelte';
  import Button from './Button.svelte';
  import Input from './Input.svelte';
  import { CURRENCIES } from '../enums/Currency';
  import { selectedOption } from './stores';

  let menuOpen = false;
  let inputValue = '';
  $: console.log(inputValue);

  const menuItems = CURRENCIES;
  let filteredItems = [];

  const handleInput = () => {
    return (filteredItems = menuItems.filter((item) =>
      item.toLowerCase().match(inputValue.toLowerCase()),
    ));
  };

  function handleSelect(event) {
    selectedOption.set(event.detail);
    menuOpen = false;
  }

  $: selectedItem = $selectedOption;
</script>

<section class="dropdown">
  <Button on:click="{() => (menuOpen = !menuOpen)}" menuOpen="{menuOpen}" />
  <div class="dropdown-content">pcdvcwd</div>

  <div id="myDropdown" class:show="{menuOpen}" class="dropdown-content">
    <Input bind:inputValue="{inputValue}" on:input="{handleInput}" />
    <!-- MENU -->
    {#if filteredItems.length > 0}
      {#each filteredItems as item}
        <Link text="{item}" on:select="{handleSelect}" />
      {/each}
    {:else}
      {#each menuItems as item}
        <Link text="{item}" on:select="{handleSelect}" />
      {/each}
    {/if}
  </div>

  <p>Selected Item: {selectedItem}</p>
</section>

<style>
  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f6f6f6;
    min-width: 230px;
    border: 1px solid #ddd;
    z-index: 1;
    max-height: 200px; /* Adjust this value as needed */
    /* Enable vertical scrolling */
    overflow-y: auto;
  }

  .dropdown-input {
    position: sticky;
    top: 0; /* Adjust this value as needed */
    z-index: 2; /* Ensure it's above other content */
  }

  /* Show the dropdown menu */
  .show {
    display: block;
  }
</style>

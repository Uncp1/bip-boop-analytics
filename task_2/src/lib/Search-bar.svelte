<script lang="ts">
  import Link from './Link.svelte';
  import Button from './Button.svelte';
  import Input from './Input.svelte';
  import { CURRENCIES } from '../enums/Currency';
  import { firstCurrencyOption, secondCurrencyOption } from './stores';
  import { beforeUpdate, onMount } from 'svelte';

  export let selectedOption: 1 | 2;

  let menuOpen = false;
  let inputValue = '';

  const menuItems = CURRENCIES;
  let filteredItems = [];

  const handleInput = () => {
    return (filteredItems = menuItems.filter((item) =>
      item.toLowerCase().match(inputValue.toLowerCase()),
    ));
  };

  const handleSelect =(event)=> {
    if (selectedOption === 1) {
      firstCurrencyOption.set(event.detail);
    } else {
      secondCurrencyOption.set(event.detail);
    }

    menuOpen = false;
  }

  $: selectedItem =
    selectedOption === 1 ? $firstCurrencyOption : $secondCurrencyOption;

    // Логика закрытия меню при клике вне него
    const handleClickOutside =(event) =>{
    if (!event.target.closest('.dropdown')) {
      menuOpen = false;
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  const handleButtonClick =()=> {
    menuOpen = !menuOpen;
  }
    
</script>

<section class="dropdown">
  <Button
    text={selectedItem}
    on:click={handleButtonClick}
    {menuOpen}
  />
  <div id="myDropdown" class:show={menuOpen} class="dropdown-content">
    <Input bind:inputValue on:input={handleInput} />
    <!-- MENU -->
    {#if filteredItems.length > 0}
      {#each filteredItems as item}
        <Link text={item} on:select={handleSelect} />
      {/each}
    {:else}
      {#each menuItems as item}
        <Link text={item} on:select={handleSelect} />
      {/each}
    {/if}
  </div>
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
    width: 180px;
    border: 1px solid #ddd;
    z-index: 1;
    max-height: 200px;
    overflow-y: auto;
  }
  .show {
    display: block;
  }
</style>

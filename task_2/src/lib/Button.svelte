<script lang="ts">
  export let menuOpen;
  export let text;
</script>

<button on:click class="dropbtn bg-indigo-600"
  >{!menuOpen ? text : 'Close Menu'}</button
>

<style>
  .dropbtn {
    width: 120px;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }
  .dropbtn:hover,
  .dropbtn:focus {
    background-color: rgb(16 185 129);
  }
</style>

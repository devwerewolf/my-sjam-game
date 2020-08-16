<script>
  export let path;
  export let inputValue;
</script>


<svelte:options accessors/>

<main>
  <span>{path}</span>
  <input bind:value={inputValue} on:keydown>
</main>
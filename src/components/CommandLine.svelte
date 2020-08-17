<script>
  export let printCLI;
  export let inputValue;
</script>


<style>
  main {
    width: 100%;
  }
</style>


<svelte:options accessors/>

<main class="command-line">
  <section>
    <span>{printCLI}</span>
    <input bind:value={inputValue} on:keydown>
  </section>
</main>
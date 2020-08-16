<script>
  export let path;
  export let inputValue;
</script>


<svelte:options accessors/>

<main>
  <section>
    <span>{path}</span>
    <input bind:value={inputValue} on:keydown>
  </section>
</main>
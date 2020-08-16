<script>
  export let input;
  export let output = "";
</script>

<style>
  input {
    border: none;
    background: none;
    color: inherit;
    margin: 0;
    padding: 0;
  }
</style>

<main>
  <input value={input} disabled>
  {@html output}
  <!-- <svelte:component this={output} /> -->
</main>
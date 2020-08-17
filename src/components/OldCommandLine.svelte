<script>
  export let input;
  export let output = "";
  export let invalid = false;
</script>

<style>
  input {
    border: none;
    background: none;
    color: inherit;
    margin: 0;
    padding: 0;
    width: 100%;
  }
  
  .void {
    color: red;
  }
  
  .invalid {
    color: orange;
  }
</style>

<main>
  <input value={input} disabled class:invalid>
  {@html output}
  
  <section class="void">
    {#if invalid}
      <div>You're in the void again...</div>
    {/if}
  </section>
</main>
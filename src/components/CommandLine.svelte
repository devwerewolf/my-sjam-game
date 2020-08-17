<script>
  import { onMount } from "svelte";

  export let printCLI;
  export let inputValue;
  export let caret;
  
  // Elements
  let _input;
  
  // Lifecycle
  onMount(() => {
    refocus();
  })
  
  function refocus() {
    _input.focus();
  }
</script>


<style>
  main {
    width: 100%;
    overflow-x: hidden;
  }
  
  span {
    white-space: pre;
  }
  
  input {
    position: absolute;
    background-color: transparent;
    color: transparent;
  }
  
  .cli {
    display: flex;
    flex-direction: row;
  }
  
  .caret {
    background-color: var(--terminal-foreground);
    width: 1rem;
  }
</style>


<svelte:options accessors/>
<input bind:this={_input} bind:value={inputValue} on:blur={refocus} on:keydown>

<main class="command-line">
  <section class="cli">
    <span>{printCLI}</span>
    <span>{inputValue}</span>
    <span class:caret></span>
  </section>
</main>
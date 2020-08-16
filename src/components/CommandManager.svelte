<script>
  // Bind props
  export let subDirectories;
  
  // Props
  export let inputValue;
  export let commandName = "";
  export let commandArgument = "";
  export let commandToExecute = "";
  
  // State
  // TODO: Put in data file?
  const commands = { 
    look: {},
    go: {}
  };
  
  // ELements
  let lookCommand;
  
  $: separatedInput = inputValue.split(" ");
  $: {
    [commandName, commandArgument] = separatedInput;
    commandToExecute = commands[commandName];
  }
  
  export function execute() {
    switch (commandName) {
      case "look": return lookCommand.outerHTML;
    }
  }
</script>


<style>
  main {
    display: none;
  }
  
  :global(.look-command) {
    color: red;
  }
</style>


<svelte:options accessors />

<main>
  <section class="look-command" bind:this={lookCommand}>
    {#if subDirectories}
      {#each subDirectories as directory}
        <div>{directory.title}</div>
      {/each}
    {/if}
  </section>
</main>
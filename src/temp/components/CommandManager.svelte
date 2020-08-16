<script>
  // Props
  export let inputValue;
  export let subDirectories;
  export let currentPath;
  export let foundShortcut;
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
  let noOp;
  
  $: separatedInput = inputValue.split(" ");
  $: {
    [commandName, commandArgument] = separatedInput;
    commandToExecute = commands[commandName];
  }
  
  export function execute() {
    if (commandToExecute) {
      switch (commandName) {
        case "look": return lookCommand.outerHTML;
        case "go":
          if (!foundShortcut) {
            currentPath += `/${commandArgument}`
          }
          return "";
      }
    }
    else return noOp.outerHTML;
  }
</script>


<style>
  main {
    display: none;
  }
  
  :global(.no-op) {
    color: red;
  }
  
  :global(.look-command) {
    color: blue;
  }
</style>


<svelte:options accessors />

<main>
  <section class="no-op" bind:this={noOp}>
    u w0t
  </section>
  
  <section class="look-command" bind:this={lookCommand}>
    {#if subDirectories}
      {#each subDirectories as directory}
        <div>{directory.title}</div>
      {/each}
    {/if}
  </section>
</main>
<script>
  export let commands;
  export let inputValue;
  export let commandName = "";
  export let commandArgument = "";
  export let commandToExecute = "";
  
  $: separatedInput = inputValue.split(" ");
  $: {
    [commandName, commandArgument] = separatedInput;
    commandToExecute = commands[commandName];
  }
</script>

<svelte:options accessors />
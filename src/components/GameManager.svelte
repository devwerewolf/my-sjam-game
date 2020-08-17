<script context="module">  
  export function moveDirectory(path) {
    let pathTitles = path.split("/");
    
    // TODO: Fix this garbage
    let subDirectories = pathTitles.reduce((dirs, title) => {
      const {directories = [], shortcut, invalid, output, items = [] } = dirs.find(dir => dir.title === title) || { invalid: true };
      return [...directories, {shortcut, invalid, output, items}];
    }, root);
    
    let {shortcut, invalid, output, items} = subDirectories[subDirectories.length - 1];
    subDirectories.pop();
    
    return { subDirectories, shortcut, invalid, output, items };
  }
</script>

<script>
  import { root } from "../data/root";
  import { createEventDispatcher, tick } from "svelte";
  
  // Constants
  const dispatch = createEventDispatcher();
  const SECONDS_PER_HOUR = 3;
  
  // State
  let _subDirectories = [];
  let _hour = "00:00";
  let _inventory = [];
  let _item = "";
  
  // Elements
  let _commandCheckInventory;
  let _commandCheckTime;
  let _commandLook;
  let _commandTake;
  
  // Functions
  export async function commandCheckInventory(inventory) {
    _inventory = [...inventory];
    
    await tick();
    dispatch("done", {output: _commandCheckInventory.outerHTML});
  }
  
  export async function commandCheckTime(timeLapse) {
    let exactHour = Math.floor(timeLapse / SECONDS_PER_HOUR) % 24;
    _hour = (exactHour < 10 ? "0" : "") + `${exactHour}:00`;
    
    await tick();
    dispatch("done", { output: _commandCheckTime.outerHTML });
  }
  
  export function commandGo(path) {
    let newPath = path;
    let hasShortcuts = true;
    let invalid = false;
    
    while (hasShortcuts) {
      const { shortcut, invalid: invalid$ } = moveDirectory(newPath);
      invalid = !!invalid$;
      
      if (shortcut) {
        newPath = shortcut;
      }
      
      hasShortcuts = !!shortcut;
    }
    
    dispatch("done", {newPath, invalid});
  }
  
  export async function commandLook(path) {
    const { subDirectories, invalid } = moveDirectory(path);
    _subDirectories = subDirectories;
    
    await tick();
    dispatch("done", { newPath: path, subDirectories, invalid, output: _commandLook.outerHTML });
  }
  
  export async function commandTake(itemName, path) {
    const { items } = moveDirectory(path);
    let item = items.find(name => name === itemName);
    _item = item ? item : ""
    
    await tick();
    dispatch("done", { item, output: _item ? _commandTake.outerHTML : "" })
  }
  
  export async function reset() {
    await tick();
    _subDirectories = [];
  }
</script>


<style>
  main {
    display: none;
  }
  
  :global(.command-look) {
    color: blue;
  }
  
  :global(.command-check-time) {
    color: green;
  }
  
  :global(.command-take) {
    color: purple;
  }
</style>


<svelte:options accessors/>

<main>
  <section class="command-check-inventory" bind:this={_commandCheckInventory}>
    <span>
      You have 
      {#each _inventory as inv}
        <strong>{inv},</strong>
      {/each}
    </span>
  </section>
  
  <section class="command-check-time" bind:this={_commandCheckTime}>
    <div>{_hour}</div>
  </section>
  
  <section class="command-look" bind:this={_commandLook}>
    {#each _subDirectories as {hidden, title}}
      {#if !hidden}
        <div>{title}</div>
      {/if}
    {/each}
  </section>
  
  <section class="command-take" bind:this={_commandTake}>
    <div>You found {_item}</div>
  </section>
</main>
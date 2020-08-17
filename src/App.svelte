<script>
  import CommandLine from "./components/CommandLine.svelte";
  import GameManager from "./components/GameManager.svelte";
  import OldCommandLine from "./components/OldCommandLine.svelte";
  import { onMount, tick } from "svelte";
	
	// Elements
	let gameManager;
	
	// State
	let currentPath = "/home/upstairs";
	let invalid = false;
  let inputValue = "";
  let historyCommands = [];
  let initTimestamp = Date.now();
  let timeLapse = 0;
  let inventory = [];
  
  // Reactive
  $: printCLI = currentPath + "> ";
  
  // Lifecycle
  onMount(() => {
    setInterval(() => {
      timeLapse = Math.floor((Date.now() - initTimestamp) / 1000);
    }, 1000);
  });
	
	async function onInputKey(event) {
		const {key} = event;
		
		if (key === "Enter") {
			const [command, argument] = inputValue.split(" ");
			
			switch (command.toLowerCase()) {
        case "check":
          switch (argument) {
            case "inventory":
              gameManager.commandCheckInventory(inventory);
              break;
            case "time":
              gameManager.commandCheckTime(timeLapse);
              break;
          }
          break;
        case "look":
          gameManager.commandLook(currentPath);
          break;
				case "go":
					switch (argument.toLowerCase()) {
						case "back":
							if (currentPath !== "/") {
								let backPath = currentPath.split("/").slice(0, -1).join("/");
								gameManager.commandGo(backPath);
							}
							break;
						default:
							let tryPath = 
								currentPath === "/"
								? `/${argument}`
								: currentPath + `/${argument}`;
								
							gameManager.commandGo(tryPath);
							break;
					}
          break;
        case "take":
          gameManager.commandTake(argument, currentPath);
          break;
      }
      
      await tick();
      inputValue = "";
      gameManager.reset();
		}
	}
	
	function onDone(event) {
    const {newPath, invalid: invalid$, output = "", item} = event.detail;
    
    if (item) {
      inventory = [...inventory, item];
    }
    
    // Append currentPath + output to history array
    historyCommands = [...historyCommands, {input: printCLI + inputValue, output, invalid: invalid$}]
		
    // Set new state
    if (invalid$ !== undefined) {
      invalid = invalid$;
    }
    
    if (newPath) {
      currentPath = newPath || "/";
    }
	}
</script>

<style>
	.invalid {
		color: orange;
	}
</style>


<GameManager bind:this={gameManager} on:done={onDone} />

<main>
  <section class="history">
    {#each historyCommands as {input, output, invalid}}
      <OldCommandLine {input} {output} {invalid}/>
    {/each}
  </section>
  
  <section class="cli" class:invalid>
    <CommandLine bind:inputValue {printCLI} on:keydown={onInputKey}/>
  </section>
</main>

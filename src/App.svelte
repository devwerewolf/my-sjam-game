<script>
	import GameManager from "./components/GameManager.svelte";
	
	// Elements
	let gameManager;
	
	// State
	let currentPath = "/home/upstairs";
	let invalid = false;
	let inputValue;
	
	function onInputKey(event) {
		const {key} = event;
		
		if (key === "Enter") {
			const [command, argument] = inputValue.split(" ");
			
			switch (command.toLowerCase()) {
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
			}
		}
	}
	
	function onNewPath(event) {
		// Append currentPath + output to history array
		
		// Set new state
		const {newPath, invalid: invalidDir} = event.detail;
		invalid = invalidDir;
		currentPath = newPath || "/";
	}
	
	function testDownstairs() {
		gameManager.commandGo("/home/upstairs/downstairs");
	}
</script>

<style>
	.invalid {
		color: orange;
	}
</style>


<GameManager bind:this={gameManager} on:newPath={onNewPath} />

<main>
	<h1>Hi</h1>
	<input type="text" bind:value={inputValue} on:keydown={onInputKey}>
	<h1 class:invalid>{currentPath}</h1>
	
	<button on:click={testDownstairs}>DOWNSTAIRS!</button>
</main>

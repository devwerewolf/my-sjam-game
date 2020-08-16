<script>
	// Components
	import CommandLine from "./components/CommandLine.svelte";
	import OldCommandLine from "./components/OldCommandLine.svelte";
	import DirectoryManager from "./components/DirectoryManager.svelte";
	import CommandManager from "./components/CommandManager.svelte";
	
	// Data
	import { root } from "./data/root";
	
	// State
	let historyCommands = [];
	let inputValue = "";
	let currentPath = "/home";
	let commandToExecute = null;
	let subDirectories;
	
	// Elements
	let commandManager;
	let commandLine;
	let directoryManager;
	
	$: printCLI = currentPath + "> ";
	
	function checkInputKey(event) {
		const {key} = event;
		
		if (key === 'Enter') {
			// Append to command history
			const historyOutput = commandManager.execute();
			const historyInput = printCLI + commandLine.inputValue;
			historyCommands = [...historyCommands, {input: historyInput, output: historyOutput}];
			
			// Clear input
			inputValue = "";
		}
	}
</script>


<style>
	main {
		color: orange;
	}
</style>


<DirectoryManager {root} bind:currentPath bind:this={directoryManager} bind:subDirectories />
<CommandManager bind:this={commandManager} bind:inputValue bind:commandToExecute {subDirectories} bind:currentPath />

<main>
	<section class="history">
		{#each historyCommands as {input, output}}
			<OldCommandLine {input} {output} />
		{/each}
	</section>
	
	<section class="player-input">
		<!-- TODO: Do I need to bind `path`? -->
		<CommandLine bind:this={commandLine} bind:inputValue path={printCLI} on:keydown={checkInputKey} />
	</section>
</main>
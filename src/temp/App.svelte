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
	let subDirectories;
	let foundShortcut = "";
	
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
			
			console.log(currentPath)
		}
	}
	
	function takeShortcut(event) {
		const { shortcut } = event.detail;
		currentPath = shortcut;
		foundShortcut = "";
	}
</script>


<style>
	main {
		color: orange;
	}
</style>


<DirectoryManager bind:this={directoryManager} {root} bind:currentPath bind:subDirectories on:shortcut={takeShortcut} />
<CommandManager bind:this={commandManager} bind:inputValue bind:currentPath {foundShortcut} {subDirectories} />

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
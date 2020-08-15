<script>
	import CommandHistoryItem from "./CommandHistoryItem.svelte";
	import InputCommand from "./InputCommand.svelte";
	import { files } from "./data/files";
	import { commands } from "./data/commands";
	import { onMount, afterUpdate, beforeUpdate } from "svelte";

	// DEBUG
	let commandHistory = [];
	let currentPath = ["", "home"];
	let inputValue = "";
	
	$: validCommands = commands.check(inputValue);
	$: args = inputValue.split(" ").filter(item => !!item).slice(1);
	
	function checkInputKey(event) {
		const { key } = event;
		
		if (key === 'Enter') {
			const command = validCommands[0];
			
			commandHistory = [...commandHistory, {
				text: printDirectory() + inputValue,
				commandName: inputValue,
				output: command.print()
			}];
			
			command.callback();
			
			commandHistory = [...commandHistory, {
				text: printDirectory()
			}]
			
			inputValue = "";
		}
	}
	
	function printDirectory() {
		return currentPath.join("/") + "> ";
	}
	
	onMount(() => {
		commandHistory = [{ text: printDirectory() }]
		$commands = [
			{
				name: "look",
				print: () => {
					const lastPathName = currentPath[currentPath.length - 1];
					let pathTraveled = [];
					
					const lookObject = currentPath.reduce((obj, cur) => {
						let file = $files;
						
						for (let path of pathTraveled) {
							file = file[path];
						}
						
						file = file[cur];
						pathTraveled.push(cur);
						
						return {
							...obj,
							...file
						};
					}, {})[lastPathName];
					
					return Object.keys(lookObject).join("<br>");
				},
				callback: () => {}
			},
			{
				name: "go",
				callback: () => {
					const newLocation = args[0].trim();
					currentPath = [...currentPath, newLocation];
				},
				print: () => {
					return "";
				}
			}
		]
	});
	
</script>

<style>
	main {
		color: orange;
	}
</style>

<main>
	<ul>
		{#each commandHistory as command}
			<li>
				<CommandHistoryItem {...command} />
			</li>
		{/each}
	</ul>
	
	<InputCommand bind:value={inputValue} on:keydown={checkInputKey}/>
</main>
import { writable } from "svelte/store";

function saveCommands(commands) {
  localStorage.setItem('commands', JSON.stringify(commands));
}

function fetchCommands() {
  return JSON.parse(localStorage.getItem('commands'));
}

function createCommands() {
  const { subscribe, set, update } = writable([]);
  
  return {
    subscribe,
    set,
    add: (newCommand) => update(cmds => {
      const commandList = [...cmds, newCommand];
      saveCommands(commandList)
      return commandList
    }),
    check: (commandName) => {
      let validCommands;
      
      update(cmds => {
        const intendedCommand = commandName.split(' ')[0]
        validCommands = cmds.filter(command => command.name.startsWith(intendedCommand));
        return cmds;
      })
      
      return validCommands;
    }
  }
}

export const commands = createCommands();
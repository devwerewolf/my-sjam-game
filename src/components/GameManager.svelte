<script context="module">  
  export function moveDirectory(path) {
    let pathTitles = path.split("/");
    
    let subDirectories = pathTitles.reduce((dirs, title) => {
      const {directories = [], shortcut, invalidDir } = dirs.find(dir => dir.title === title) || { invalidDir: true };
      return [...directories, {shortcut, invalidDir}];
    }, root);
    
    let {shortcut, invalidDir} = subDirectories[subDirectories.length - 1];
    subDirectories.pop();
    
    return { subDirectories, shortcut, invalidDir };
  }
</script>

<script>
  import { root } from "../data/root";
  import { createEventDispatcher } from "svelte";
  
  const dispatch = createEventDispatcher();
  
  export function commandGo(path) {
    let newPath = path;
    let hasShortcuts = true;
    let invalid = false;
    
    while (hasShortcuts) {
      const { shortcut, invalidDir } = moveDirectory(newPath);
      invalid = !!invalidDir;
      
      if (shortcut) {
        newPath = shortcut;
      }
      
      hasShortcuts = !!shortcut;
    }
    
    dispatch("newPath", {newPath, invalid});
  }
</script>

<svelte:options accessors/>
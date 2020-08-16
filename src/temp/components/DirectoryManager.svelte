<script>
  import { createEventDispatcher } from "svelte";

  export let root;
  export let currentPath;
  // export let currentDirectory = null;
  export let pathItems = [];
  export let subDirectories = [];
  
  // Bind props
  export let foundShortcut = "";
  
  const dispatch = createEventDispatcher();
  
  $: {
    if (!foundShortcut) {
      pathItems = currentPath.split('/');
      
      subDirectories = pathItems.reduce((dirs, item) => {
        const {shortcut, directories} = dirs.find(dir => dir.title === item);
        
        if (shortcut) {
          foundShortcut = shortcut;
          dispatch('shortcut', { shortcut });
          return;
        }
        
        return directories;
      }, root);
    }
  }
  
  export function syncState() {
    pathItems = currentPath.split('/');
    
    subDirectories = pathItems.reduce((dirs, item) => {
      const {shortcut, directories} = dirs.find(dir => dir.title === item);
      
      if (shortcut) {
        foundShortcut = shortcut;
        dispatch('shortcut', { shortcut })
        return;
      }
      
      return directories;
    }, root);
    
    console.log(pathItems);
  }
</script>


<svelte:options accessors/>
<script>
  export let root;
  export let currentPath;
  // export let currentDirectory = null;
  export let pathItems = [];
  export let subDirectories = [];
  
  $: {
    pathItems = currentPath.split('/');
    
    subDirectories = pathItems.reduce((dirs, item) => {
      const directory = dirs.find(dir => dir.title === item);
      return directory.directories;
    }, root);
  }
</script>


<svelte:options accessors/>
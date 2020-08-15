<script>
  export let text;
  export let commandName = "";
  export let output = "";
</script>

<style>
  main {
    font-weight: bold;
  }
  
  .look {
    color: blue;
  }
  
  .output {
    white-space: pre;
  }
</style>

<main>
  <section class="input">
    {text}
  </section>
  
  <section class="ouput {commandName}">
    {@html output}
  </section>
</main>
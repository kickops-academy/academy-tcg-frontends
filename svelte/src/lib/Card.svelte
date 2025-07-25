<script>
  let { source, alt } = $props();
  let error = $state(false);
</script>

{#if !error}
  <img
    src={source}
    {alt}
    onerror={() => {
      error = true;
    }}
  />
{/if}

<script>
  let { label, icon, onClick} = $props();
</script>

<button onclick={onClick}>
  {label} {icon}
</button>

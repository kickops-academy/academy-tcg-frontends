<script setup>
  const props = defineProps({
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    onClick: {
      type: Function,
      required: true
    }
  });
</script>

<template>
  <button @click="onClick" class="custom-button">
    {{ icon }} {{ label }}
  </button>
</template>

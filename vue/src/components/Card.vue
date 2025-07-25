<script setup>
import { ref } from 'vue';

  const props = defineProps({
    source: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    }
  });
  
  const error = ref(false);
</script>

<template>
  <img v-if="!error" :src="source" :alt="alt" v-on:error="() => error = true" />
</template>

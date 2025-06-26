<script setup>
import { defineProps } from 'vue';

defineProps({
  bg: {
    type: String,
    default: 'bg-gray-100'
  }
});
</script>

<template>
  <div :class="bg" class="p-6 rounded-lg shadow-md">
    <slot></slot>
    <!-- In React, we have `children` -->
  </div>
</template>
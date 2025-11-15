<script setup lang="ts">
const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <button class="btn btn-primary" @click="handleClick">Edit</button>
</template>
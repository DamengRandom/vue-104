<script setup lang="ts">
const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}

const props = defineProps({
  id: {
    type: Number,
    default: 1
  }
})
</script>

<template>
  <a
    :href="`/users/${props.id}/edit`"
    class="text-indigo-600 hover:text-indigo-500"
    @click="handleClick"
  >Edit</a>
</template>
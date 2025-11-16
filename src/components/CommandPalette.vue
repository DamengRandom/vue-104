<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'

const active = ref(false)

function handleKeyboardShortcut(e: KeyboardEvent) {
  if (e.metaKey && e.key === 'k') {
    console.log('toggling command palette')
    active.value = !active.value
    e.preventDefault()
  }
}

onMounted(() => {
  document.body.addEventListener('keydown', handleKeyboardShortcut)
})

onUnmounted(() => {
  document.body.removeEventListener('keydown', handleKeyboardShortcut) // prevent memory leak, do clean up when unmounting ~
})
</script>
<template>
  <div v-if="active">
    <input
      type="text"
      placeholder="Command Palette"
    >
  </div>
</template>

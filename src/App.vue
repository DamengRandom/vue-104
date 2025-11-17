<script setup lang="ts">
  import Navbar from '@/components/Navbar.vue';
  import { RouterView } from 'vue-router';
  import { VueQueryDevtoolsPanel } from '@tanstack/vue-query-devtools'
  import { useRouter } from 'vue-router';
  import { computed, ref } from 'vue';

  const isDevToolsOpen = ref(false);

  const router = useRouter();
  const isTanstackVueQueryRoute = computed(() => router.currentRoute.value.name === 'tanstack-vue-query');

  function toggleDevTools() {
    isDevToolsOpen.value = !isDevToolsOpen.value;
  }
</script>

<template>
  <Navbar />
  <RouterView />
  <div v-if="isTanstackVueQueryRoute">
    <button @click="toggleDevTools">
      Toggle TanStack Vue Query Dev Tools
    </button>
    <VueQueryDevtoolsPanel
      v-if="isDevToolsOpen"
      :on-close="toggleDevTools"
    />
  </div>
</template>

<style scoped>

</style>

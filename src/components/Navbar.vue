<script setup>
  import logo from '@/assets/img/logo.png';
  import { ref } from 'vue';
  import { RouterLink, useRoute } from 'vue-router';

  const logoFile = ref(logo);
  const route = useRoute();

  const isActiveTab = (clickedPath) => route.path === clickedPath;
</script>

<template>
  <nav class="bg-theme border-b border-theme-500">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
        >
          <!-- Logo -->
          <RouterLink
            class="flex flex-shrink-0 items-center mr-4"
            to="/"
          >
            <img
              class="h-10 w-auto"
              :src="logoFile"
              alt="Vue Jobs"
            >
            <span class="hidden md:block text-white text-2xl font-bold ml-2">Vue Jobs</span>
          </RouterLink>
          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                to="/"
                class="text-white hover:bg-base hover:text-white rounded-md px-3 py-2"
                :class="isActiveTab('/') ? 'bg-base' : ''"
              >
                Home
              </RouterLink>
              <RouterLink
                to="/jobs"
                class="text-white hover:bg-base hover:text-white rounded-md px-3 py-2"
                :class="isActiveTab('/jobs') ? 'bg-base' : ''"
              >
                Jobs
              </RouterLink>
              <RouterLink
                to="/jobs/add"
                class="text-white hover:bg-base hover:text-white rounded-md px-3 py-2"
                :class="isActiveTab('/jobs/add') ? 'bg-base' : ''"
              >
                Add Job
              </RouterLink>
              <RouterLink
                to="/element-plus"
                class="text-white hover:bg-base hover:text-white rounded-md px-3 py-2"
                :class="isActiveTab('/element-plus') ? 'bg-base' : ''"
              >
                Element Plus Study
              </RouterLink>
              <RouterLink
                to="/avoid-mistake"
                class="text-white hover:bg-base hover:text-white rounded-md px-3 py-2"
                :class="isActiveTab('/avoid-mistake') ? 'bg-base' : ''"
              >
                Avoid Mistake
              </RouterLink>
              <RouterLink
                to="/vue-table-test"
                class="text-white hover:bg-base hover:text-white rounded-md px-3 py-2"
                :class="isActiveTab('/vue-table-test') ? 'bg-base' : ''"
              >
                Vue Table Test
              </RouterLink>
              <RouterLink
                to="/tanstack-vue-query"
                class="text-white hover:bg-base hover:text-white rounded-md px-3 py-2"
                :class="isActiveTab('/tanstack-vue-query') ? 'bg-base' : ''"
              >
                Tanstack Vue Query Test
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
  import { RouterLink } from 'vue-router';
</script>
<template>
  <!-- Go Back -->
  <section>
    <div class="container m-auto py-6 px-6">
      <RouterLink
        to="/jobs"
        class="text-base hover:text-base flex items-center"
      >
        <i class="fas fa-arrow-left mr-2" /> Back to Job Listings
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import jobData from '@/jobs.json';
import { ref, defineProps } from 'vue';
import Job from '@/components/Job.vue';

const props = defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  }
});

const jobs = ref(jobData);
</script>

<template>
  <section class="px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-theme mb-6 text-center">Browse Jobs</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Job v-for="job in jobs.data.slice(0, limit || jobs.data.length)" :key="job.id" :job="job">
          {{ job.title }}
        </Job>
      </div>
    </div>
  </section>
  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <a
      href="/jobs"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
      >View All Jobs</a
    >
  </section>
</template>

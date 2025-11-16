<script setup>
import { reactive, defineProps, onMounted } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';
import JobCard from '@/components/JobCard.vue';

// reactive(): only takes object, doesn't take primitives, eg: string, boolean, etc
// ref(): has .value prop, and takes primitives or reference types of data ~

const props = defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  }
});

const jobsState = reactive({
  jobs: [],
  isLoading: true,
  isError: false,
});

onMounted(async () => { // componentDidMount or useEffect(() => {}, [])
  try {
    // const response = await axios.get('http://localhost:3782/jobs');
    const response = await axios.get('/api/jobs');
    jobsState.jobs = response.data;
  } catch (error) {
    console.error('Error on fetching jobs', error);
    jobsState.isError = true;
  } finally {
    jobsState.isLoading = false;
  }
});

</script>

<template>
  <section class="px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-theme mb-6 text-center">
        Browse Jobs
      </h2>
      <!-- Show loading spinner -->
      <div
        v-if="jobsState.isLoading"
        class="text-center text-grey-500 py-6"
      >
        <PulseLoader />
      </div>
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <JobCard
          v-for="job in jobsState.jobs.slice(0, props.limit || jobsState.jobs.length)"
          :key="job.id"
          :job="job"
        >
          {{ job.title }}
        </JobCard>
      </div>
    </div>
  </section>
  <section
    v-if="showButton"
    class="m-auto max-w-lg my-10 px-6"
  >
    <RouterLink
      to="/jobs"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
    >
      View All Jobs
    </RouterLink>
  </section>
</template>

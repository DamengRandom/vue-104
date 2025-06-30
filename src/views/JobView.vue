<script setup>
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
  import { reactive, onMounted } from 'vue';
  import { useRoute, RouterLink, useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification';
  import axios from 'axios';
  import BackButton from '@/components/BackButton.vue';

  const route = useRoute();
  const router = useRouter();
  const toast = useToast();
  const jobId = route.params.id;
  const jobState = reactive({
    job: {},
    isLoading: true,
    isError: false,
  });

  onMounted(async () => {
    try {
      // const response = await axios.get(`http://localhost:3782/jobs/${jobId}`);
      const response = await axios.get(`/api/jobs/${jobId}`);
      jobState.job = response.data;
    } catch (error) {
      console.error(`Error on fetching a job with id ${jobId}`, error);
      jobState.isError = true;
    } finally {
      jobState.isLoading = false;
    }
  });

  const deleteJob = async () => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this job?');
      
      if (confirm) {
        await axios.delete(`/api/jobs/${jobId}`);
        toast.success('Job deleted successfully ~');
        router.push('/jobs');
      }
    } catch (error) {
      console.error(`Error on deleting a job with id ${jobId}`, error);
      toast.error('Job was not deleted ..');
    }
  } 
</script>
<template>
  <BackButton />
  <section v-if="!jobState.isLoading" class="bg-orange-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div
            class="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
          >
            <div class="text-gray-500 mb-4">{{ jobState.job.type }}</div>
            <h1 class="text-3xl font-bold mb-4">{{ jobState.job.title }}</h1>
            <div
              class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
            >
              <i class="pi pi-map-marker text-orange-700 mr-2 mt-1 text-center"></i>
              <p class="text-orange-700">{{ jobState.job.location }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-base text-lg font-bold mb-6">
              Job Description
            </h3>

            <p class="mb-4">
              {{ jobState.job.description }}
            </p>

            <h3 class="text-base text-lg font-bold mb-2">Salary</h3>

            <p class="mb-4">{{ jobState.job.salary }} / Year</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
          <!-- Company Info -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">{{ jobState.job.company.name }}</h3>

            <h2 class="text-2xl">NewTek Solutions</h2>

            <p class="my-2">
              {{ jobState.job.company.description }}
            </p>

            <hr class="my-4" />

            <h3 class="text-xl">Contact Email:</h3>

            <p class="my-2 bg-orange-100 p-2 font-bold">
              {{ jobState.job.company.contactEmail }}
            </p>

            <h3 class="text-xl">Contact Phone:</h3>

            <p class="my-2 bg-orange-100 p-2 font-bold">{{ jobState.job.company.contactPhone }}</p>
          </div>

          <!-- Manage -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Job</h3>
            <RouterLink
              :to="`/jobs/edit/${jobState.job.id}`"
              class="bg-orange-500 hover:bg-orange-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >Edit Job</RouterLink
            >
            <button
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              @click="deleteJob"
            >
              Delete Job
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>
  <div v-else class="text-center text-grey-500 py-6"><PulseLoader /></div>
</template>
<script setup>
  import { reactive } from 'vue';
  import axios from 'axios';
  import router from '@/router';
  import { useToast } from 'vue-toastification';

  const jobForm = reactive({
    type: 'Full-Time',
    title: '',
    description: '',
    salary: '',
    location: '',
    company: {
      name: '',
      description: '',
      contactEmail: '',
      contactPhone: '',
    }
  });

  const toast = useToast();

  const onSubmit = async () => {
    const jobData = {
      type: jobForm.type,
      title: jobForm.title,
      description: jobForm.description,
      salary: jobForm.salary,
      location: jobForm.location,
      company: {
        name: jobForm.company.name,
        description: jobForm.company.description,
        contactEmail: jobForm.company.contactEmail,
        contactPhone: jobForm.company.contactPhone,
      }
    };
    
    try {
      // const response = await axios.get(`http://localhost:3782/jobs/${jobId}`);
      const response = await axios.post(`/api/jobs`, jobData);
      toast.success('Job added successfully ~');
      router.push(`/jobs/${response.data.id}`);
    } catch (error) {
      console.error('Error on creating a new job', error);
      toast.error('Job was not added ..');
    }
  }
</script>
<template>
  <section class="bg-orange-50">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
      >
        <form @submit.prevent="onSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">
            Add Job
          </h2>

          <div class="mb-4">
            <label
              for="type"
              class="block text-gray-700 font-bold mb-2"
            >Job Type</label>
            <select
              id="type"
              v-model="jobForm.type"
              name="type"
              class="border rounded w-full py-2 px-3"
              required
            >
              <option value="Full-Time">
                Full-Time
              </option>
              <option value="Part-Time">
                Part-Time
              </option>
              <option value="Remote">
                Remote
              </option>
              <option value="Internship">
                Internship
              </option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Job Listing Name</label>
            <input
              id="name"
              v-model="jobForm.title"
              type="text"
              name="name"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="eg. Beautiful Apartment In Miami"
              required
            >
          </div>
          <div class="mb-4">
            <label
              for="description"
              class="block text-gray-700 font-bold mb-2"
            >Description</label>
            <textarea
              id="description"
              v-model="jobForm.description"
              name="description"
              class="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="Add any job duties, expectations, requirements, etc"
            />
          </div>

          <div class="mb-4">
            <label
              for="type"
              class="block text-gray-700 font-bold mb-2"
            >Salary</label>
            <select
              id="salary"
              v-model="jobForm.salary"
              name="salary"
              class="border rounded w-full py-2 px-3"
              required
            >
              <option value="Under $50K">
                under $50K
              </option>
              <option value="$50K - $60K">
                $50 - $60K
              </option>
              <option value="$60K - $70K">
                $60 - $70K
              </option>
              <option value="$70K - $80K">
                $70 - $80K
              </option>
              <option value="$80K - $90K">
                $80 - $90K
              </option>
              <option value="$90K - $100K">
                $90 - $100K
              </option>
              <option value="$100K - $125K">
                $100 - $125K
              </option>
              <option value="$125K - $150K">
                $125 - $150K
              </option>
              <option value="$150K - $175K">
                $150 - $175K
              </option>
              <option value="$175K - $200K">
                $175 - $200K
              </option>
              <option value="Over $200K">
                Over $200K
              </option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">
              Location
            </label>
            <input
              id="location"
              v-model="jobForm.location"
              type="text"
              name="location"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Company Location"
              required
            >
          </div>

          <h3 class="text-2xl mb-5">
            Company Info
          </h3>

          <div class="mb-4">
            <label
              for="company"
              class="block text-gray-700 font-bold mb-2"
            >Company Name</label>
            <input
              id="company"
              v-model="jobForm.company.name"
              type="text"
              name="company"
              class="border rounded w-full py-2 px-3"
              placeholder="Company Name"
            >
          </div>

          <div class="mb-4">
            <label
              for="company_description"
              class="block text-gray-700 font-bold mb-2"
            >Company Description</label>
            <textarea
              id="company_description"
              v-model="jobForm.company.description"
              name="company_description"
              class="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="What does your company do?"
            />
          </div>

          <div class="mb-4">
            <label
              for="contact_email"
              class="block text-gray-700 font-bold mb-2"
            >Contact Email</label>
            <input
              id="contact_email"
              v-model="jobForm.company.contactEmail"
              type="email"
              name="contact_email"
              class="border rounded w-full py-2 px-3"
              placeholder="Email address for applicants"
              required
            >
          </div>
          <div class="mb-4">
            <label
              for="contact_phone"
              class="block text-gray-700 font-bold mb-2"
            >Contact Phone</label>
            <input
              id="contact_phone"
              v-model="jobForm.company.contactPhone"
              type="tel"
              name="contact_phone"
              class="border rounded w-full py-2 px-3"
              placeholder="Optional phone for applicants"
            >
          </div>

          <div>
            <button
              class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Job
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
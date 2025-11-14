<script setup lang="ts">
import { ref } from 'vue'
import MutatePropsLoginForm from '@/components/MutatePropsLoginForm.vue'

const loginData = ref({
  email: 'me@test.com',
  password: '1234'
})
</script>
<template>
  <h2>Reactive State Replace Example</h2>
  <MutatePropsLoginForm v-model="loginData" />
  <h5>test login data:</h5>
  <pre>
    {{ loginData }}
  </pre>
</template>
<style scoped>
h5, pre {
  color: red;
}
</style>

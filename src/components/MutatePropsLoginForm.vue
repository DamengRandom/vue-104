<script setup lang="ts">
import { ref, watch } from 'vue'
type Props = {
  modelValue: {
    email: string
    password: string
  }
}

const props = defineProps<Props>()
const propCopy = { ...props.modelValue } // always copy a prop and make a new prop , Never directly mutate a PROP in VUEJS !!!!
const localValue = ref(propCopy) 
watch(
//   () => localValue.value,
() => props.modelValue,
  (val) => (localValue.value = { ...val }),
  {
    deep: true
  }
)
defineEmits<{
  (e: 'update:modelValue', payload: Props['modelValue']): void
}>()
</script>
<template>
  <form @submit.prevent="$emit('update:modelValue', { ...localValue })">
    <div>
      <label for="email">Email</label>
      <input type="email" v-model="localValue.email" />
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" v-model="localValue.password" />
    </div>

    <button>Login</button>
  </form>
</template>

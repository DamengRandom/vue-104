<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const numbers = ref<number[]>([]);

const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;

const addNumber = () => {
    numbers.value.push(generateRandomNumber()); // mutating the array directly because of push function, so we need { deep: true } ~
};

watch(numbers, () => {
    console.log(`new number ${numbers.value[numbers.value.length - 1]} added`);
}, { deep: true }); // { deep: true } is necessary here because we are mutating array elements, eg: adding new number for the array
</script>
<template>
  <h2>Watch Array Mistake Example</h2>
  <button @click="addNumber">
    Add Random Number
  </button>
  <ul>
    <li
      v-for="(number, index) in numbers"
      :key="`${index}-${number}`"
    >
      {{ number }}
    </li>
  </ul>
</template>
<!-- <script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const numbers = ref<number[]>([]);

const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;

const addNumber = () => {
    // numbers.value.push(generateRandomNumber());
    numbers.value = [...numbers.value, generateRandomNumber()];
};

watch(numbers, () => {
    console.log(`new number ${numbers.value[numbers.value.length - 1]} added`);
}); // we don't need to set { deep: true } because when we add number which means we are replacing the array with a new array !!! IMMUTABLE UPDATE
</script>
<template>
    <h2>Watch Array Mistake Example</h2>
    <button @click="addNumber">Add Random Number</button>
    <ul>
        <li v-for="(number, index) in numbers" :key="`${index}-${number}`">{{ number }}</li>
    </ul>
</template> -->

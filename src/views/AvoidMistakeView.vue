<script setup lang="ts">
import WatchArrayMistake from '@/components/WatchArrayMistake.vue';
import ReactiveStateReplaceExample from '@/components/ReactiveStateReplaceExample.vue';
import MutatePropsExample from '@/components/MutatePropsExample.vue';
import EventListenerExample from '@/components/EventListenerExample.vue';
// import ScriptInjectionsExample from '@/components/ScriptInjectionsExample.vue';
</script>
<template>
  <h2>AvoidMistakeView Examples</h2>
  <WatchArrayMistake />
  <ReactiveStateReplaceExample />
  <MutatePropsExample />
  <EventListenerExample />
  <p>Always remember when using `computed`, please ensure we have reactive dependency value, otherwise, computed value wont get updated .. </p>
  <!-- <ScriptInjectionsExample /> -->
  <p>* better not using vanilla JS inside Vue JS app</p>
</template>

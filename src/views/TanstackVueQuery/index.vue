<script setup>
import { useInfiniteQuery } from '@tanstack/vue-query';
import { useInfiniteScroll } from '@vueuse/core';
import { ref } from 'vue';

const scrollDataSize = 10;
const el = ref(null)

const fetchPosts = async ({ pageParam = 0 }) => {
  const res = await fetch(`https://dummyjson.com/posts?limit=10&skip=${pageParam}&select=title,views`);
  const data = await res.json();
  console.log(`Fetched posts: ${JSON.stringify(data, null, 2)}`);
  return data;
}

const { data, isSuccess, isPending, isError, hasNextPage, fetchNextPage, isFetchNextPageError } = useInfiniteQuery({
  queryKey: ['Posts'],
  queryFn: fetchPosts,
  getNextPageParam: (lastPage) => {
    // If we got 10 posts, there might be more, so return next skip value
    if (lastPage.posts.length === scrollDataSize) {
      return lastPage.skip + scrollDataSize;
    }
    // Otherwise, no more pages
    return undefined;
  },
});

useInfiniteScroll(
  el,
  async () => {
    if (hasNextPage.value) {
      await fetchNextPage();
    }
  },
  {
    distance: scrollDataSize
  }
);
</script>
<template>
  <div v-if="isPending">
    Loading ..
  </div>
  <div v-if="isError">
    Error fetching posts ..
  </div>
  <h3>Tanstack Vue Query Demo</h3>
  <div
    v-if="isSuccess"
    ref="el"
    class="max-h-[40rem] w-[40rem] p-4 bg-slate-200 overflow-y-scroll shadow-2xl rounded-sm mt-3"
  >
    <div
      v-for="(page, index) in data.pages"
      :key="`page-${index}`"
      class=""
    >
      <div 
        v-for="post in page.posts"
        :key="post.id"
        class="p-4 my-2 shadow-md rounded-md bg-white"
      >
        {{ post.title }} - <span class="text-sm text-slate-500">{{ post.views }}</span>
      </div>
      <div v-if="isFetchNextPageError">
        Fetching failed during scrolling ..
      </div>
    </div>
  </div>
</template>
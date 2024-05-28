<script setup lang="ts">
import { ref, computed } from 'vue';
import { useFetch } from '@vueuse/core'
import { useOrder } from '@/components/Order';

const { isFetching, error, data } = useFetch('/api/menu').get().json();
const search = ref('');
const results = computed(() => (data.value||[]).filter((item) => item.name.toLowerCase().includes(search.value.toLowerCase())));
const order = useOrder();
</script>
<template>
  <div v-if="error">
    something went wrong, please refresh the page or contact support
  </div>
  <div v-else-if="isFetching">
    Loading...
  </div>
  <div v-else>
    <input v-model="search" data-testId="search" />
    <template v-if="results.length" >
      <div v-for="item in results" :key="item.id" data-testId="search-result" @click="()=> order.add(item)">
        {{ item.name }}
      </div>
    </template>
    <div v-else>
      no results matching your search
    </div>
  </div>
</template>
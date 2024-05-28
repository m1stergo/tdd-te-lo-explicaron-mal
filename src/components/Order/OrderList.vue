<script setup lang="ts">
import { useOrder } from '.';
import { computed } from 'vue';

const { items, remove } = useOrder();
const total = computed(() => items.value.reduce((acc,item) => {
  acc += item.price;
  return acc;
},0))
</script>
<template>
  <div v-if="items.length">
    <div v-for="item in items" :key="item.id" @click="remove(item.orderId)" data-testId="order-item">
      {{  item.name }}
    </div>
    <div>Total: {{ total }}</div>
  </div>
  <div v-else>
    Your order is empty
    <div>Total: 0</div>
  </div>
</template>
import { ref } from 'vue';

type FoodItem = {
  id: string;
  name: string;
}
type OrderItem = FoodItem & { orderId: number };

const items = ref<OrderItem[]>([])
let orderId = 0;


export function useOrder() {
  function add(item: FoodItem) {
    console.log('item', item);
    items.value.push({...item, orderId: ++orderId})
  }
  function dispose() {
    items.value = [];
  }
  function remove(orderId: number) {
    items.value = items.value.filter((item) => item.orderId !== orderId);
  }

  return {
    items,
    add,
    dispose,
    remove
  }
}
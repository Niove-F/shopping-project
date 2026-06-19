<template>
  <q-card class="product-card">
    <q-img :src="imageUrl" :alt="productName" class="product-image" spinner-color="primary" />

    <q-card-section>
      <div class="row items-center justify-between q-mb-sm">
        <span class="text-caption text-grey-7">{{ category }}</span>
        <span class="text-subtitle1 text-weight-bold">${{ formattedPrice }}</span>
      </div>

      <div class="text-subtitle1 text-weight-bold q-mb-xs">{{ productName }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const productName = computed(() => props.product.description || 'Producto')
const category = computed(() => props.product.categoryName)
const formattedPrice = computed(() => {
  const price = Number(props.product.price ?? props.product.unitPrice ?? 0)
  return Number.isFinite(price) ? price.toFixed(2) : '0.00'
})
const imageUrl = computed(() => props.product.imageUrl)
</script>

<style scoped>
.product-card {
  height: 100%;
  border-radius: 12px;
}

.product-image {
  height: 220px;
  object-fit: cover;
}
</style>

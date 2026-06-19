<template>
  <div>
    <div v-if="loading" class="row justify-center q-py-xl">
      <q-spinner color="primary" size="3rem" />
    </div>

    <q-banner v-else-if="error" class="bg-negative text-white q-mb-md">
      {{ error }}
    </q-banner>

    <div v-else-if="!products.length" class="text-center q-py-xl text-grey-7">
      No hay productos que coincidan con los filtros.
    </div>

    <div v-else class="row q-col-gutter-md">
      <div
        v-for="product in products"
        :key="product.id || product.productId || product.name"
        class="col-12 col-sm-6 col-md-4"
      >
        <ProductItem :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductItem from '@/components/products/ProductItem.vue'

defineProps({
  products: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
})
</script>

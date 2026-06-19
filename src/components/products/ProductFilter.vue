<template>
  <q-card class="filter-card q-pa-md">
    <div class="text-subtitle1 text-weight-bold q-mb-md">Filtros</div>

    <q-input
      v-model="localFilters.search"
      label="Buscar producto"
      dense
      outlined
      clearable
      class="q-mb-sm"
      prepend-inner-icon="search"
    />

    <q-select
      v-model="localFilters.category"
      :options="categoryOptions"
      label="Categoría"
      dense
      outlined
      emit-value
      map-options
      class="q-mb-sm"
    />

    <div class="row q-col-gutter-sm">
      <div class="col-6">
        <q-input
          v-model="localFilters.minPrice"
          type="number"
          label="Precio mín."
          dense
          outlined
          min="0"
        />
      </div>
      <div class="col-6">
        <q-input
          v-model="localFilters.maxPrice"
          type="number"
          label="Precio máx."
          dense
          outlined
          min="0"
        />
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'

const props = defineProps({
  categories: {
    type: Array,
    default: () => ['all'],
  },
})

const emit = defineEmits(['update:filters'])

const localFilters = reactive({
  search: '',
  category: 'all',
  minPrice: '',
  maxPrice: '',
})

const categoryOptions = computed(() =>
  props.categories.map((category) => ({
    label: category === 'all' ? 'Todas' : category,
    value: category,
  })),
)

watch(
  localFilters,
  (value) => {
    emit('update:filters', { ...value })
  },
  { deep: true },
)
</script>

<style scoped>
.filter-card {
  border-radius: 12px;
}
</style>

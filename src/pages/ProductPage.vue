<template>
  <q-page class="products-page q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-3">
        <ProductFilter :categories="categories" @update:filters="handleFiltersUpdate" />
      </div>

      <div class="col-12 col-md-9">
        <div class="row items-center justify-between q-mb-md">
          <div>
            <h2 class="text-h5 q-my-none">Catálogo de productos</h2>
            <p class="text-caption text-grey-7 q-mb-none">
              Explora los productos disponibles en la tienda.
            </p>
          </div>
        </div>

        <q-banner v-if="errorMessage && !loading" class="bg-negative text-white q-mb-md">
          {{ errorMessage }}
        </q-banner>

        <ProductList :products="filteredProducts" :loading="loading" :error="errorMessage" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import ProductFilter from '@/components/products/ProductFilter.vue'
import ProductList from '@/components/products/ProductList.vue'

const router = useRouter()
const API_PORT = 5072
const api = axios.create({ baseURL: `http://localhost:${API_PORT}` })

const products = ref([])
const categoryMap = ref({})
const loading = ref(false)
const errorMessage = ref('')
const filters = ref({
  search: '',
  category: 'all',
  minPrice: '',
  maxPrice: '',
})

function extractItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.products)) return payload.products
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.result)) return payload.result
  return []
}

function getCategoryId(product) {
  const category = product?.category

  if (category && typeof category === 'object') {
    return (
      category.Id ||
      category.id ||
      category.ID ||
      category.categoryId ||
      category.categoryID ||
      category.CategoryId ||
      null
    )
  }

  return (
    product?.categoryId ||
    product?.categoryID ||
    product?.CategoryId ||
    product?.category?.Id ||
    product?.category?.id ||
    null
  )
}

function getCategoryName(product) {
  const categoryId = getCategoryId(product)
  const key = categoryId !== null && categoryId !== undefined ? String(categoryId) : null
  const resolved = key ? categoryMap.value[key] || categoryMap.value[categoryId] : null

  return (
    resolved ||
    product?.categoryName ||
    product?.categoryDescription ||
    product?.category?.Description ||
    product?.category?.description ||
    'Sin categoría'
  )
}

const categories = computed(() => {
  const uniqueCategories = [...new Set(products.value.map((product) => getCategoryName(product)))]

  return ['all', ...uniqueCategories]
})

const filteredProducts = computed(() => {
  const searchTerm = filters.value.search.trim().toLowerCase()

  return products.value.filter((product) => {
    const categoryName = getCategoryName(product)
    const price = Number(product.price ?? product.unitPrice ?? 0)
    const normalizedName =
      `${product.name || product.title || ''} ${product.description || ''} ${categoryName}`.toLowerCase()

    const matchesSearch = !searchTerm || normalizedName.includes(searchTerm)
    const matchesCategory =
      filters.value.category === 'all' || categoryName === filters.value.category
    const matchesMin =
      filters.value.minPrice === '' || Number.isNaN(Number(filters.value.minPrice))
        ? true
        : price >= Number(filters.value.minPrice)
    const matchesMax =
      filters.value.maxPrice === '' || Number.isNaN(Number(filters.value.maxPrice))
        ? true
        : price <= Number(filters.value.maxPrice)

    return matchesSearch && matchesCategory && matchesMin && matchesMax
  })
})

function handleFiltersUpdate(nextFilters) {
  filters.value = nextFilters
}

async function fetchCategories(token) {
  const endpoints = ['/api/category', '/api/categories']

  for (const endpoint of endpoints) {
    try {
      const response = await api.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const rows = extractItems(response.data)
      const nextMap = {}

      rows.forEach((row) => {
        const id =
          row?.Id ||
          row?.id ||
          row?.categoryId ||
          row?.categoryID ||
          row?.CategoryId ||
          row?.category?.Id
        const desc =
          row?.Description ||
          row?.description ||
          row?.name ||
          row?.title ||
          row?.category?.Description ||
          row?.category?.description

        if (id !== undefined && id !== null) {
          nextMap[String(id)] = desc || 'Sin categoría'
        }
      })

      categoryMap.value = nextMap
      return
    } catch (error) {
      console.log(error)
    }
  }
}

async function fetchProducts(token) {
  const response = await api.get('/api/product', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const items = extractItems(response.data)
  products.value = items.map((product) => ({
    ...product,
    categoryName: getCategoryName(product),
  }))

  if (!items.length) {
    errorMessage.value = 'No se encontraron productos disponibles.'
  }
}

async function loadProducts() {
  const token = localStorage.getItem('authToken')

  if (!token) {
    errorMessage.value = 'Debes iniciar sesión para ver los productos.'
    router.push('/login')
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    await fetchCategories(token)
    await fetchProducts(token)
  } catch (error) {
    if (error.response?.status === 401) {
      errorMessage.value = 'Tu sesión expiró. Inicia sesión nuevamente.'
      localStorage.removeItem('authToken')
      router.push('/login')
    } else {
      errorMessage.value = 'No se pudieron cargar los productos.'
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProducts()
})
</script>

<style scoped>
.products-page {
  background: #f7f8fb;
}
</style>

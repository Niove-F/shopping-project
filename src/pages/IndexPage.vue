<template>
  <q-page class="pagina">
    <div class="column items-center">
      <img
        alt="Quasar logo"
        src="~@/assets/quasar-logo-vertical.svg"
        style="width: 200px; height: 200px; padding-bottom: 20px"
      />

      <q-btn class="q-mt-md" color="primary" to="/login" label="Go to Login" no-caps />
    </div>
  </q-page>
</template>

<script setup>
//
</script>

<style>
.pagina {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dfdfdf;
}
</style>

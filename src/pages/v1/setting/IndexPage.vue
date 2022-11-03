<template>
  <Suspense>
    <!-- main content -->
    <AsyncComp />

    <!-- loading state -->
    <template #fallback>
      <app-loading />
    </template>
  </Suspense>
</template>
<script setup>
import { defineAsyncComponent } from 'vue'
const AsyncComp = defineAsyncComponent(() =>
  import('./AppSetting.vue')
)
</script>

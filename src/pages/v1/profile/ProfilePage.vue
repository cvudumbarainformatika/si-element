<template>
  <div>
    {{ store.form.provinsi }}
  </div>
</template>
<script setup>
import { useSurveyorFormStore } from 'src/stores/surveyor/form'

const store = useSurveyorFormStore()

console.log('store', store.agamas)

</script>

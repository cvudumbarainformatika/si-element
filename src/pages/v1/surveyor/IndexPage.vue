<template>
  <!-- PENDAFTARAN -->
  <q-page class="q-pa-lg">
    <page-desktop v-if="!mobile" />
    <page-mobile v-else />
  </q-page>
</template>

<script setup>
import pageMobile from './mobile/PageMobile.vue'
import pageDesktop from './PageDesktop.vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const mobile = $q.screen.lt.md

</script>

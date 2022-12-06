<template>
  <q-page class="q-pa-lg">
    <page-desktop v-if="!mobile" />
    <page-mobile v-else />
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar'
import PageDesktop from './PageDesktop.vue'
import pageMobile from './mobile/PageMobile.vue'

const $q = useQuasar()
const mobile = $q.screen.lt.md
</script>

<template>
  <q-layout
    view="lHh Lpr lFf"
    :class="dark?'':'page-light'"
  >
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from 'quasar'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'AuthLayout',
  setup() {
    const $q = useQuasar()

    const dark = computed(() => {
      return $q.dark.isActive
    })

    return {
      dark
    }
  }
})
</script>

<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

import customIcons from 'src/custom-icons/custom-icons'

export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar()
    // console.log($q.dark.isActive)
    $q.dark.set(false)
    $q.iconSet.set(customIcons)
    document.body.setAttribute(['data-theme'], 'custom')
  }
})
</script>

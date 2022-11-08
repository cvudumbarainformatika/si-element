<template>
  <div class="flex flex-column">
    <div class="q-py-xl">
      <q-inner-loading :showing="visible">
        <q-spinner-gears
          size="30px"
          color="primary"
        />
        <div class="text-primary q-pt-sm">
          Lihat email untuk login..
        </div>
        <q-btn
          outline
          size="sm"
          color="primary"
          label="Login"
          @click="toLogin"
        />
      </q-inner-loading>
    </div>
  </div>
</template>
<script setup>
import { routerInstance } from 'src/boot/router'
import { ref } from 'vue'

const visible = ref(true)

function toLogin() {
  routerInstance.replace('/login')
}
</script>

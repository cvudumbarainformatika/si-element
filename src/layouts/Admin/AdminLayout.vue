<template>
  <q-layout
    view="lHh LpR lFr"
    :class="dark?'':'page-light'"
  >
    <AdmHeader
      :dark="dark"
      :mobile="mobile"
      @toggle-left="toggleLeftDrawer"
    />
    <LeftDrawer
      v-if="!mobile"
      v-model="leftDrawerOpen"
      :dark="dark"
      :menus="menus"
    />
    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      overlay
      behavior="desktop"
      bordered
    >
      <!-- drawer content -->
    </q-drawer>

    <!-- menu bottom mobile -->
    <adm-footer-menu
      v-if="mobile"
      :dark="dark"
      :menus="menus"
      @set="setDark"
    />
    <q-page-container>
      <div
        v-if="!mobile"
        class="q-pa-md"
      >
        <router-view />
      </div>
      <div
        v-if="mobile"
        class="q-pt-md screen--sm"
      >
        <router-view />
      </div>
    </q-page-container>
    <q-page-sticky
      v-if="!mobile"
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-fab
        size="sm"
        padding="sm"
        icon="icon-mat-display_settings"
        color="primary"
        direction="up"
      >
        <q-fab-action
          :color="dark?'warning':'dark'"
          icon="icon-mat-tungsten"
          @click="setDark(dark)"
        />
      </q-fab>
    </q-page-sticky>
    <q-btn
      v-if="mobile"
      dense
      :color="dark?'warning':'dark'"
      class="bulb"
      round
      icon="icon-mat-tungsten"
      @click="setDark(dark)"
    />
  </q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { computed, onMounted, ref } from 'vue'

import LeftDrawer from './LeftDrawer.vue'
import AdmHeader from './AdmHeader.vue'
import AdmFooterMenu from './AdmFooterMenu.vue'
import { useAuthStore } from 'src/stores/auth'
import { useAppSettingStore } from 'src/stores/appsetting/appsetting'

const menus = useAppSettingStore().menus

const store = useAuthStore()
const setting = useAppSettingStore()
const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)
const $q = useQuasar()
const mobile = $q.screen.lt.md

const dark = computed(() => {
  return $q.dark.isActive
})

function setDark(val) {
  const x = !val
  $q.dark.set(x)
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

onMounted(() => {
  store.getUser()
  setting.getInitialData()
})

// function toggleRightDrawer() {
//   rightDrawerOpen.value = !rightDrawerOpen.value
// }
</script>

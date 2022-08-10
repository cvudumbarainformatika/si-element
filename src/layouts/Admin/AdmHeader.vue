<template>
  <q-header
    :bordered="!mobile"
    reveal
    :class="dark?'bg-dark':'bg-white text-dark'"
  >
    <div
      class="q-px-sm q-py-sm flex items-center justify-between"
      style="height:60px"
    >
      <!-- LEFT -->
      <div>
        <q-btn
          v-if="!mobile"
          flat
          round
          icon="icon-mat-segment"
          class="flip__icon"
          @click="emit('toggleLeft')"
        />
        <div v-else>
          <q-avatar size="40px">
            <img src="~assets/logos/logo.png">
          </q-avatar>
        </div>
      </div>
      <!-- RIGHT -->
      <div :class="!mobile?'q-pr-md':'q-pr-sm'">
        <q-btn
          flat
          round
          icon="icon-eva-bell-outline"
        />
        <q-avatar
          size="40px"
          class="q-ml-sm cursor-pointer bg-grey"
        >
          <img src="~assets/images/actor.svg">
          <adm-header-menu-profile />
        </q-avatar>
      </div>
    </div>
  </q-header>
</template>

<script setup>
import AdmHeaderMenuProfile from './AdmHeaderMenuProfile.vue'
const emit = defineEmits(['toggleLeft'])
defineProps({
  dark: {
    type: Boolean,
    default: false
  },
  mobile: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.flip__icon {
  transform: scaleX(-1);
}
</style>

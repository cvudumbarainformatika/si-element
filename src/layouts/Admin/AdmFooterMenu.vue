<template>
  <q-footer
    bordered
    class="bg-white shadow-1"
  >
    <q-tabs
      v-model="tab"
      indicator-color="transparent"
    >
      <!-- :class="warna ? 'bg-dark': ''" -->
      <!-- :to="{ name: tab.url }" -->
      <q-route-tab
        v-for="(tabb, i) in filterMenu()"
        :key="'tab' + i"
        :class="warna ? 'text-white bg-dark' : 'text-grey-10'"
        active-color="primary"
        :to="{ name: tabb.name }"
        :name="tabb.name"
        :icon="tabb.icon"
        no-caps
      >
        <!-- <div class="f-10">
          {{ tab.name }}
        </div> -->
      </q-route-tab>
      <!-- :color="warna ? 'text-warning' :'text-dark ' " -->
      <!-- <q-tab
        :class="warna ? 'text-white bg-warning' : 'text-white bg-dark' "
        icon="icon-mat-tungsten"
        @click="emits('set',dark)"
      /> -->
    </q-tabs>
  </q-footer>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'

const props = defineProps({
  dark: {
    type: Boolean,
    default: false
  },
  menus: {
    type: Array,
    default: () => []
  }
})

const store = useAuthStore()
const role = computed(() => {
  return store.user ? store.user.data.role : 'surveyor'
})
function filterMenu() {
  const arr = props.menus
  const a = arr.filter(function (item) {
    return item.rules
      ? item.rules.some(function (group) {
        return group.name === role.value
      }) : null
  })
  return a
}
// const emits = defineEmits(['set'])
const warna = computed(() => {
  // console.log('dark ', props.dark)
  return props.dark
})
// const menus = ref([
//   { id: 1, name: 'dashboard', icon: 'icon-mat-dashboard' },
//   { id: 2, name: 'surveyor', icon: 'icon-mat-supervisor_account' },
//   { id: 3, name: 'profile', icon: 'icon-mat-person' }
// ])

const tab = ref('dashboard')
console.log('router', props.dark)
</script>

<style lang="scss" scoped>

</style>

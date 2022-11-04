<template>
  <q-drawer
    show-if-above
    :width="70"
  >
    <!-- logo -->
    <div class="absolute-top">
      <div
        class=" flex flex-center"
        style="height: 60px;"
      >
        <q-avatar size="40px">
          <img src="~assets/logos/logo.png">
        </q-avatar>
      </div>
    </div>
    <!-- <q-scroll-area
        class="fit"
        style="height:calc(100%-50px) ;padding-top:50px"
      > -->
    <div
      class="flex column flex-center full-height"
      style="height:calc(100%-60px) "
    >
      <div
        v-for="(menu, i) in props.menus"
        :key="i"
        @mouseenter="hover(menu,i)"
      >
        <q-item
          ref="refItem"
          :key="i"
          :to="`/${menu.name}`"
          replace
          class="sidebar flex flex-center"
          :active-class="props.dark ? 'active-dark text-white' :'active text-primary'"
          :active="aktif(path)===menu.name"
          @click="menuClick(menu,i)"
        >
          <q-menu
            ref="refMenu"
            anchor="top right"
            self="top left"
            transition-show="slide-down"
            transition-hide="slide-right"
            :offset="[0,0]"
          >
            <q-card
              v-if="menu.submenus.length"
              style="width:200px"
            >
              <q-card-section>
                <div class="text-weight-bold f-12">
                  <q-item
                    :to="`/${menu.link}`"
                  >
                    <q-item-section>{{ menu.nama }}</q-item-section>
                  </q-item>
                </div>
                <div class="q-my-sm">
                  <q-separator />
                </div>

                <div
                  v-for="(submenu,n) in menu.submenus"
                  :key="n"
                >
                  <div v-if="submenu.link">
                    <q-item
                      ref="refSubItem"
                      :to="`/${submenu.link}`"
                      replace
                      class="submenu flex flex-center item item-link"
                      :active-class="dark? 'active-dark' : 'active'"
                      :active="path===submenu.name"
                      exact
                    >
                      <!-- {{ aktif(menu.name) }} : {{ path }} -->
                      <q-item-section
                        v-if="submenu.icon"
                        avatar
                      >
                        <q-icon
                          :name="submenu.icon"
                          size="25px"
                        />
                      </q-item-section>
                      <q-item-section>{{ submenu.nama }}</q-item-section>
                    </q-item>
                  </div>
                </div>
              </q-card-section>
            </q-card>
            <q-card v-if="!menu.submenus.length">
              <q-card-section>
                <div class="text-weight-bold f-12">
                  <q-item
                    :to="`/${menu.link}`"
                  >
                    <q-item-section>{{ menu.nama }}</q-item-section>
                  </q-item>
                </div>
              </q-card-section>
            </q-card>
          </q-menu>
          <!-- <q-tooltip
          class="bg-primary"
          anchor="center right"
          self="center left"
          :offset="[5, 5]"
        >
          <strong class="">{{ menu.name }}</strong>

          (<q-icon name="icon-mat-keyboard_arrow_right" />)
        </q-tooltip> -->
          <q-icon
            :name="menu.icon"
            size="25px"
          />
        </q-item>
      </div>
    </div>
    <!-- </q-scroll-area> -->

    <div class="just-shadow absolute-full overflow-hidden no-pointer-events" />
  </q-drawer>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

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

const path = computed(() => useRoute().name)
const aktif = (apem) => {
  const temp = apem.split('.')
  return temp[0]
}
const refItem = ref(null)
const refMenu = ref(null)
const prev = ref(0)
const hover = (menu, i) => {
  refMenu.value[i].show()
  if (!refItem.value[i].active) {
    refMenu.value[i].offset[0] = 16
    refMenu.value[i].offset[1] = 0
  } else {
    refMenu.value[i].offset[0] = 0
    refMenu.value[i].offset[1] = 0
  }
  //     if (menu.submenus.length) {
  // }
  // console.log('prev', prev.value)
  if (i !== prev.value) {
    leave(prev.value)
  }
  // console.log('prev', prev.value, 'i', i)
  prev.value = i
  // console.log('ref item', refItem.value[i].active)
  // console.log('ref menu', refMenu.value[i].offset)
}
const leave = (i) => {
  refMenu.value[i].hide()
  // if (menu.submenus.length) {
  // }
  // console.log('leave', i)
  // console.log('ref item ', [i], refItem.value[i].active)
  // console.log('ref menu', refMenu.value[i])
}
const menuClick = (menu, i) => {
  // hover(menu, i)
}
// const menus = ref([
//   { id: 1, name: 'dashboard', link: 'dashboard', icon: 'icon-mat-dashboard' },
//   { id: 2, name: 'surveyor', link: 'surveyor', icon: 'icon-mat-supervisor_account' }
//   // { id: 3, name: 'pelayanan', icon: 'icon-mat-medical_information' }
// ])

// function activated(val) {
//   if (val) {
//     if (props.dark) {
//       return 'page-dark text-white'
//     } else {
//       return 'bg-grey-4 text-primary'
//     }
//   }
//   return 'text-grey-5'
// }

// const router = useRouter()
console.log('router', props.dark)
</script>

<style lang="scss" scoped>
.sidebar {
  width: calc(100% - 10px);
  height:60px;
}

.submenu {
  width: calc(100% - 10px);
  height: 30px;
}

a.sidebar {
  text-decoration: none;
  color:$grey-5;
}
a.router-link-active, a.router-link-exact-active, a.active {
    margin-left: 10px;
    border-radius: 10px 0px 0px 10px;
    border-left: 3px solid $primary;
    background-color: $grey-4;
  }
a.router-link-active-dark, a.router-link-exact-active-dark, a.active-dark {
    margin-left: 10px;
    border-radius: 10px 0px 0px 10px;
    border-left: 3px solid $primary;
    background-color: $dark-page;
  }

.just-shadow {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-shadow: 0 0 10px 2px rgb(0 0 0 / 20%), 0 0px 10px rgb(0 0 0 / 24%);
}
</style>

<template>
  <q-menu
    transition-show="flip-left"
    transition-hide="flip-right"
    :offset="[0,10]"
  >
    <q-list style="min-width: 131px">
      <q-item
        v-close-popup
        clickable
      >
        <q-item-section avatar>
          <q-icon
            name="icon-mat-account_circle"
            size="16px"
          />
        </q-item-section>
        <q-item-section>Profile</q-item-section>
      </q-item>
      <q-item
        v-close-popup
        clickable
      >
        <q-item-section avatar>
          <q-icon
            name="icon-mat-settings"
            size="16px"
          />
        </q-item-section>
        <q-item-section>Settings</q-item-section>
      </q-item>
      <q-separator />
      <q-item
        v-close-popup
        clickable
        @click="signOut"
      >
        <q-item-section avatar>
          <q-icon
            name="icon-mat-exit_to_app"
            size="16px"
          />
        </q-item-section>
        <q-item-section>Logout </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script setup>
import { useAuthStore } from 'src/stores/auth'

const store = useAuthStore()

function signOut() {
  store.logout()
}
</script>

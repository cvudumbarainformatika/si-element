<template>
  <div class="q-pa-xs">
    <div
      class="q-gutter-y-md"
    >
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab
            name="bidang survei"
            label="bidang survei"
          />
          <q-tab
            name="status kepegawaian"
            label="status kepegawaian"
          />
          <q-tab
            name="provesi"
            label="provesi"
          />
        </q-tabs>

        <q-separator />

        <q-tab-panels
          v-model="tab"
          animated
        >
          <q-tab-panel name="bidang survei">
            <bidang-page />
          </q-tab-panel>

          <q-tab-panel name="status kepegawaian">
            <status-kp-page />
          </q-tab-panel>

          <q-tab-panel name="provesi">
            <provesi-page />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import BidangPage from '../bidangsurvei/BidangPage.vue'
import StatusKpPage from '../statuskepegawaian/StatusKpPage.vue'
import ProvesiPage from '../provesi/ProvesiPage.vue'
const tab = ref('bidang survei')

</script>

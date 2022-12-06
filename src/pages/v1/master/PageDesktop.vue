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
            <div class="text-h6">
              bidang survei
            </div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="status kepegawaian">
            <div class="text-h6">
              status kepegawaian
            </div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="provesi">
            <div class="text-h6">
              provesi
            </div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const tab = ref('bidang survei')
</script>

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
            <div class="row q-col-gutter-lg">
              <div class="col-md-12 col-xs-12">
                <app-card :is-header="false">
                  <template #content>
                    <app-table
                      title="Data bidang survei"
                      :columns="table.columns"
                      :column-hide="table.columnHide"
                      :items="table.items"
                      :meta="table.meta"
                      :per-page="table.params.per_page"
                      :order-by="table.params.order_by"
                      :sort="table.params.sort"
                      :loading="table.loading"
                      :to-search="table.params.q"
                      btn-delete
                      @set-order="table.setOrder"
                      @set-row="table.setPerPage"
                      @goto="table.setPage"
                      @delete-ids="table.deletesData"
                      @delete="table.deletesData"
                      @find="table.setSearch"
                      @refresh="table.refreshTable"
                      @new-data="store.newData"
                      @edit-data="store.editData"
                    />
                  </template>
                </app-card>
              </div>
            </div>
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
    <form-dialog v-model="store.isOpen" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useBidangSurveiTable } from 'src/stores/master/bidangsurvei/table'
import { useBidangSurveiFormStore } from 'src/stores/master/bidangsurvei/form'
import formDialog from './FormDialog.vue'
const table = useBidangSurveiTable()
const store = useBidangSurveiFormStore()
const tab = ref('bidang survei')

table.getDataTable()
</script>

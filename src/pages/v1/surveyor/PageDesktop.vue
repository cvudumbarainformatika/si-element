<template>
  <div
    class="row q-col-gutter-lg"
  >
    <div class="col-md-12 col-xs-12">
      <app-card
        :is-header="false"
      >
        <template #content>
          <!-- table -->
          <app-table
            title="Data Surveyor"
            :columns="table.columns"
            :column-hide="table.columnHide"
            :items="table.items"
            :meta="table.meta"
            :per-page="table.params.per_page"
            :order-by="table.params.order_by"
            :sort="table.params.sort"
            :loading="table.loading"
            :to-search="table.params.q"
            row-image="image"
            @set-order="table.setOder"
            @set-row="table.setPerPage"
            @goto="table.setPage"
            @delete-ids="table.deletesData"
            @delete="table.deletesData"
            @find="table.setSearch"
            @refresh="table.refreshTable"
            @new-data="store.newData"
            @edit-data="store.editData"
          >
            <!-- ini untuk ubah header -->
            <!-- <template #col-name>
                <div>Nama</div>
              </template>
              <template #col-gender>
                <div>L/P</div>
              </template> -->
            <!-- ini untuk ubah storeat cellnya -->
            <!-- <template #cell-alamat="{row}">
                <div>{{ row.alamat }}, {{ row.provinsi }}</div>
              </template>
              <template #cell-updated_at="{row}">
                <div>{{ date.formatDate(row.updated_at, 'DD MMMM, YYYY') }}</div>
              </template> -->
          </app-table>
        </template>
      </app-card>
    </div>
    <!-- dialog -->
    <formDialog v-model="store.isOpen" />
  </div>
</template>

<script setup>
import { useSurveyorTable } from 'src/stores/surveyor/table'
import { useSurveyorFormStore } from 'src/stores/surveyor/form'
import formDialog from './FormDialog.vue'

const table = useSurveyorTable()
const store = useSurveyorFormStore()

table.getDataTable()
</script>

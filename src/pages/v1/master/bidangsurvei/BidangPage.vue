<template>
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
            is-new-data
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
  <form-dialog v-model="store.isOpen" />
</template>
<script setup>

import { useBidangSurveiTable } from 'src/stores/master/bidangsurvei/table'
import { useBidangSurveiFormStore } from 'src/stores/master/bidangsurvei/form'
import formDialog from './FormDialog.vue'
const table = useBidangSurveiTable()
const store = useBidangSurveiFormStore()

table.getDataTable()
</script>

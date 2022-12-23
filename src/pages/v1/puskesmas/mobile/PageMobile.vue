<template>
  <div class="row q-col-gutter-lg">
    <div class="col-md-12 col-xs-12">
      <app-card :is-header="false">
        <template #content>
          <app-table
            title="Data Puskesmas"
            :columns="table.columns"
            :column-hide="table.columnHide"
            :items="table.items"
            :meta="table.meta"
            :per-page="table.params.per_page"
            :order-by="table.params.order_by"
            :sort="table.params.sort"
            :loading="table.loading"
            :to-search="table.params.q"
            is-konfirm
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
            @konfirm-data="store.konfirmasiData"
          />
        </template>
      </app-card>
    </div>
  </div>
</template>
<script setup>
import { usePuskesmasFormStore } from 'src/stores/puskesmas/form'
import { usePuskesmasTable } from 'src/stores/puskesmas/table'

const table = usePuskesmasTable()
const store = usePuskesmasFormStore()
table.getDataTable()
</script>

<template>
  <div class="row q-col-gutter-lg">
    <div class="col-md-12 col-xs-12">
      <app-card title="Tabel User">
        <template #content>
          <app-table
            title="Data User"
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
            is-new-data
            @set-order="table.setOrder"
            @set-row="table.setPerPage"
            @goto="table.setPage"
            @delete-ids="table.deletesData"
            @delete="table.deletesData"
            @find="table.setSearch"
            @refresh="table.refreshTable"
            @new-data="form.newData"
            @edit-data="form.editData"
          />
        </template>
      </app-card>
    </div>
    <!-- dialog -->
    <formDialog v-model="form.isOpen" />
  </div>
</template>

<script setup>
import { useUserTable } from 'src/stores/user/table'
import { useUserForm } from 'src/stores/user/form'
import FormDialog from '../user/FormDialog.vue'

const table = useUserTable()
const form = useUserForm()
table.getDataTable()
</script>

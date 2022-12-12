<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Form Status Kepegawaian"
      desc="Input Data Status Kepegawaian"
    >
      <template #content>
        <q-form
          ref="formReff"
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="col-md-6 col-xs-12">
            <app-input
              v-model="store.form.nama"
              label="Nama"
              outlined
            />
          </div>
          <q-separator class="q-my-md/" />
          <div class="text-right q-gutter-md">
            <app-btn
              type="reset"
              color="dark"
              label="Cancel"
            />
            <app-btn
              label="Simpan"
              :loading="store.loading"
            />
          </div>
        </q-form>
      </template>
    </app-card>
  </q-dialog>
</template>
<script setup>
import { ref } from 'vue'
import { useStatusKepegawaianFormStore } from 'src/stores/master/statuskepegawaian/form'
const store = useStatusKepegawaianFormStore()

const formReff = ref(null)
const onSubmit = () => {
  store.saveForm().then(() => {
    formReff.value.resetValidations()
  })
}

const onReset = () => {
  formReff.value.resetValidations()
  store.setOpen()
}
</script>

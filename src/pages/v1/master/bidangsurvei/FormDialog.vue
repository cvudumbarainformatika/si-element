<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Form Bidang Survei"
      desc="Input Data Bidang Survei"
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
          <q-separator class="q-my-md" />
          <div class="text-right q-gutter-md">
            <app-btn
              type="reset"
              color="dark"
              label="cancel"
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
import { useBidangSurveiFormStore } from 'src/stores/master/bidangsurvei/form'
const store = useBidangSurveiFormStore()

const formReff = ref(null)
const onSubmit = () => {
  store.saveForm().then(() => {
    // console.log('reest', formReff)
    // formReff.value.resetValidation()
  })
}
const onReset = () => {
  formReff.value.resetValidation()
  store.setOpen()
}

</script>
<style lang="scss" scoped>
</style>

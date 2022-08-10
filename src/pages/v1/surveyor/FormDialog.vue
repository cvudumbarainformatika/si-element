<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Form Surveyor"
      desc="input Data Surveyor"
    >
      <template #content>
        <q-form
          ref="formReff"
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="row q-col-gutter-md">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.nik"
                label="Nik*"
                outlined
                :disable="store.edited"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.nama"
                label="Nama*"
                outlined
              />
            </div>
            <div class="col-md-12 col-xs-12">
              <app-input
                v-model="store.form.alamat"
                valid
                label="Alamat"
                outlined
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-autocomplete
                v-model="store.form.provinsi"
                outlined
                valid
                label="Provinsi"
                autocomplete="name"
                :source="store.provinces"
                option-label="name"
                option-value="name"
                @set-model="store.getKota"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-autocomplete
                v-model="store.form.kabkot"
                outlined
                valid
                label="Kabupaten / Kota"
                autocomplete="name"
                :source="store.kotas"
                :disable="store.kotas.length===0"
                option-label="name"
                option-value="name"
                @set-model="store.getKec"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-autocomplete
                v-model="store.form.kecamatan"
                outlined
                valid
                label="Kecamatan"
                autocomplete="name"
                :source="store.kecs"
                :disable="store.kecs.length===0"
                option-label="name"
                option-value="name"
                @set-model="store.getKels"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-autocomplete
                v-model="store.form.kelurahan"
                outlined
                valid
                label="Kelurahan"
                autocomplete="name"
                :source="store.kels"
                :disable="store.kecs.length===0"
                option-label="name"
                option-value="name"
              />
            </div>
            <div class="col-md-4 col-xs-12">
              <app-input
                v-model="store.form.kodepos"
                label="Kodepos"
                outlined
                valid
              />
            </div>
            <div class="col-md-4 col-xs-12">
              <app-input
                v-model="store.form.tempat_lahir"
                label="Tempat lahir"
                outlined
                valid
              />
            </div>
            <div class="col-md-4 col-xs-12">
              <app-input-date
                valid
                :model="store.form.tanggal_lahir"
                icon="icon-mat-event"
                label="Tanggal Lahir"
                outlined
                @set-model="(val)=>store.setForm('tanggal_lahir', val)"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <q-select
                v-model="store.form.agama"
                :options="store.agamas"
                label="Pilih Agama"
                dense
                outlined
                hide-bottom-space
                no-error-icon
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Harap diisi']"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.no_hp"
                label="no Hp"
                outlined
                valid
              />
            </div>
          </div>
          <q-separator class="q-my-md" />
          <div class="text-right">
            <app-btn
              type="reset"
              color="dark"
              label="Cancel"
              class="q-mr-md"
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
import { useSurveyorFormStore } from 'src/stores/surveyor/form'

const store = useSurveyorFormStore()
// const model = ref('Islam')

store.getProvinces()
store.setToday()
const formReff = ref(null)
const onSubmit = () => {
  store.saveForm().then(() => {
    // console.log('form', formReff)
    formReff.value.resetValidation()
  })
}

const onReset = () => {
  formReff.value.resetValidation()
  store.setOpen()
}

</script>

<style lang="scss" scoped>
</style>

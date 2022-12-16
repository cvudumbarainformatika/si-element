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
                v-model="store.form.nama_lengkap"
                label="Nama*"
                outlined
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.no_hp1"
                label="Nomor Handphone 1"
                outlined
                valid
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.no_hp2"
                label="Nomor Handphone 2"
                outlined
                valid
              />
            </div>
            <div class="col-md-4 col-xs-12">
              <app-input
                v-model="store.form.tempat_lahir"
                label="Tempal Lahir"
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
            <div class="col-md-4 col-xs-12">
              <q-select
                v-model="store.form.gender"
                :options="store.genders"
                label="Jenis Kelamin"
                option-value="id"
                option-label="name"
                emit-value
                map-options
                dense
                outlined
                hide-bottom-space
                no-error-icon
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Harap diisi']"
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
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.kodepos"
                valid
                label="Kode Pos"
                outlined
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
            <div class="col-md-4 col-xs-12">
              <app-input
                v-model="store.form.nama_bank"
                valid
                label="Nama Bank"
                outlined
              />
            </div>
            <div class="col-md-4 col-xs-12">
              <app-input
                v-model="store.form.nama_buku_tabungan"
                valid
                label="Nama di buku tabungan"
                outlined
              />
            </div>
            <div class="col-md-4 col-xs-12">
              <app-input
                v-model="store.form.no_rekening"
                valid
                label="Nomor Rekening"
                outlined
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.no_asuransi_bpjs"
                type="number"
                outlined
                label="Nomor asuransi BPJS"
                lazy-rules
                :rules="[
                  (val) => (val !== null && val !== '') || 'Harap diisi',
                  (val) => (val.length <= 16 && val.length >= 16) || 'wajib 16 karakter',
                ]"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.nilai_toefl"
                valid
                label="Nilai TOEFL"
                outlined
              />
            </div>
            <div class="col-md-4 col-xs-12">
              <app-autocomplete
                v-model="store.form.stawai_id"
                outlined
                label="Status Kepeawaian"
                autocomplete="nama"
                :source="store.status_kepegawaians"
                option-label="nama"
                option-value="id"
              />
            </div>
            <div class="col-md-4 col-xs-12">
              <app-autocomplete
                v-model="store.form.bivei_id"
                outlined
                label="Bidang Survei"
                autocomplete="nama"
                :source="store.bidang_surveis"
                option-label="nama"
                option-value="id"
              />
            </div>
            <div class="col-md-4 col-xs-12">
              <app-autocomplete
                v-model="store.form.profesi_id"
                outlined
                label="Provesi"
                autocomplete="nama"
                :source="store.profesis"
                option-label="nama"
                option-value="id"
              />
            </div>
            <div class="col-md-12 col-xs-12">
              <app-input
                v-model="store.form.domil_alamat"
                outlined
                label="Alamat Domisili"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-autocomplete
                v-model="store.form.domil_provinsi"
                outlined
                label="Provinsi Domisili"
                autocomplete="name"
                :source="store.domil_provinces"
                option-label="name"
                option-value="name"
                @set-model="store.domil_getKota"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-autocomplete
                v-model="store.form.domil_kabkot"
                outlined
                valid
                label="Kabupaten / Kota Domisili"
                autocomplete="name"
                :source="store.domil_kotas"
                :disable="store.domil_kotas.length===0 "
                option-label="name"
                option-value="name"
                @set-model="store.domil_getKec"
              />
            </div>
            <div class="col-md-4 col-xs-12">
              <app-autocomplete
                v-model="store.form.domil_kecamatan"
                outlined
                valid
                label="Kecamatan"
                autocomplete="name"
                :source="store.domil_kecs"
                :disable="store.domil_kecs.length===0"
                option-label="name"
                option-value="name"
                @set-model="store.domil_getKels"
              />
            </div>
            <div class="col-md-4 col-xs-12">
              <app-autocomplete
                v-model="store.form.domil_kelurahan"
                outlined
                valid
                label="Kelurahan"
                autocomplete="name"
                :source="store.domil_kels"
                :disable="store.domil_kecs.length===0 "
                option-label="name"
                option-value="name"
              />
            </div>
            <div class="col-md-4 col-xs-12">
              <app-input
                v-model="store.form.domil_kodepos"
                outlined
                label="Kode Pos"
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
store.getBidangSurvei()
store.getStatusKP()
store.getProvesi()
const formReff = ref(null)
const onSubmit = () => {
  store.saveFormTable().then(() => {
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

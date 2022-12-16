<template>
  <div class="q-pa-md">
    <q-stepper
      ref="stepper"
      v-model="store.step"
      color="primary"
      header-nav
      animated
    >
      <q-step
        :name="1"
        title="Biodata"
        icon="settings"
        :error="error"
        :done="store.step > 1"
      >
        <q-card>
          <q-card-section>
            <div class="text-h6">
              Profil
            </div>
            <div class="text-subtitle">
              Mohon melengkapi biodata anda
            </div>
          </q-card-section>
          <q-separator />

          <q-card-section>
            <div class="q-gutter-xs q-px-xs ">
              <div class="row">
                <div class="col q-gutter-xs q-px-xs">
                  <app-input
                    v-model="store.form.nik"
                    disable
                    outlined
                    label="Nomor induk kependudukan"
                  />
                </div>
                <div class="col q-gutter-xs q-px-xs">
                  <app-input
                    v-model="store.form.nama_lengkap"
                    disable
                    outlined
                    label="Nama lengkap"
                  />
                </div>
                <div class="col q-gutter-xs q-px-xs">
                  <app-input
                    v-model="store.form.email"
                    disable
                    outlined
                    label="Email"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col q-gutter-xs q-px-xs">
                  <app-input
                    v-model="store.form.no_hp1"
                    outlined
                    label="Nomor handphone 1"
                  />
                </div>
                <div class="col q-gutter-xs q-px-xs">
                  <app-input
                    v-model="store.form.no_hp2"
                    outlined
                    label="Nomor handphone 2"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col q-gutter-xs q-px-xs">
                  <app-input
                    v-model="store.form.tempat_lahir"
                    outlined
                    label="Tempat lahir"
                  />
                </div>
                <div class="col q-gutter-xs q-px-xs">
                  <app-input-date
                    valid
                    :model="store.form.tanggal_lahir"
                    icon="icon-mat-event"
                    label="Tanggal Lahir"
                    outlined
                    @set-model="(val)=>store.setForm('tanggal_lahir', val)"
                  />
                </div>
                <div class="col q-gutter-xs q-px-xs">
                  <q-select
                    v-model="store.form.gender"
                    :options="store.genders"
                    label="Pilih Jenis Kelamin"
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
              </div>

              <div class="q-px-xs">
                <app-input
                  v-model="store.form.alamat"
                  outlined

                  label="Alamat"
                />
              </div>
              <div class="row">
                <div class="col q-gutter-xs q-px-xs">
                  <app-autocomplete
                    v-model="store.form.provinsi"
                    outlined
                    label="Provinsi"
                    autocomplete="name"
                    :source="store.provinces"
                    option-label="name"
                    option-value="name"
                    @set-model="store.getKota"
                  />
                </div>
                <div class="col q-gutter-xs q-px-xs">
                  <app-autocomplete
                    v-model="store.form.kabkot"
                    outlined
                    label="Kabupaten / Kota"
                    autocomplete="name"
                    :source="store.kotas"
                    :disable="store.kotas.length === 0"
                    option-label="name"
                    option-value="name"
                    @set-model="store.getKec"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col q-gutter-xs q-px-xs">
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
                <div class="col q-gutter-xs q-px-xs">
                  <app-autocomplete
                    v-model="store.form.kelurahan"
                    outlined
                    valid
                    label="Desa"
                    autocomplete="name"
                    :source="store.kels"
                    :disable="store.kecs.length === 0"
                    option-label="name"
                    option-value="name"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col q-gutter-xs q-px-xs">
                  <app-input
                    v-model="store.form.kodepos"
                    type="number"
                    outlined
                    label="Kode pos"
                  />
                </div>
                <div class="col q-gutter-xs q-px-xs">
                  <app-input
                    v-model="store.form.nama_npwp"
                    outlined
                    label="Nama npwp"
                  />
                </div>
                <div class="col q-gutter-xs q-px-xs">
                  <q-select
                    v-model="store.form.status_kepegawaian"
                    :options="store.status_kepegawaians"
                    label="Pilih Status Kepegawaian"
                    dense
                    outlined
                    hide-bottom-space
                    no-error-icon
                    lazy-rules
                    :rules="[(val) => (val && val.length > 0) || 'Harap diisi']"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col q-gutter-xs q-px-xs">
                  <app-input
                    v-model="store.form.nama_bank"
                    outlined
                    label="Nama bank"
                  />
                </div>
                <div class="col q-gutter-xs q-px-xs">
                  <app-input
                    v-model="store.form.nama_buku_tabungan"
                    outlined
                    label="Nama di buku tabungan"
                  />
                </div>
                <div class="col q-gutter-xs q-px-xs">
                  <app-input
                    v-model="store.form.no_rekening"
                    type="number"
                    outlined
                    label="Nomor rekening"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col q-gutter-xs q-px-xs">
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
                <div class="col q-gutter-xs q-px-xs">
                  <app-input
                    v-model="store.form.nilai_toefl"
                    type="number"
                    outlined
                    label="Nilai TOEFL"
                  />
                </div>
                <div class="col q-gutter-xs q-px-xs">
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
              </div>
              <div class="row ">
                <div class="col q-gutter-xs q-px-xs ">
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
                <div class="col q-gutter-xs q-px-xs ">
                  <q-select
                    v-model="store.form.profesi"
                    :options="store.profesis"
                    label="Provesi"
                    dense
                    outlined
                    hide-bottom-space
                    no-error-icon
                    lazy-rules
                    :rules="[(val) => (val && val.length > 0) || 'Harap diisi']"
                  />
                </div>
              </div>
              <div class="q-gutter-xs q-px-xs">
                <q-checkbox
                  v-model="store.cekbox"
                  dense
                  label="Alamat domisili sama dengan alamat KTP"
                  color="primary"
                />
              </div>
              <div class="q-px-xs">
                <app-input
                  v-model="store.form.domil_alamat"
                  outlined
                  label="Alamat"
                  :disable="store.cekbox===true"
                />
              </div>
              <div class="row">
                <div class="col q-gutter-xs q-px-xs">
                  <app-autocomplete
                    v-model="store.form.domil_provinsi"
                    outlined
                    label="Provinsi"
                    :disable="store.cekbox===true"
                    autocomplete="name"
                    :source="store.domil_provinces"
                    option-label="name"
                    option-value="name"
                    @set-model="store.domil_getKota"
                  />
                </div>
                <div class="col q-gutter-xs q-px-xs">
                  <app-autocomplete
                    v-model="store.form.domil_kabkot"
                    outlined
                    valid
                    label="Kabupaten / Kota"
                    autocomplete="name"
                    :source="store.domil_kotas"
                    :disable="store.domil_kotas.length===0 || store.cekbox===true"
                    option-label="name"
                    option-value="name"
                    @set-model="store.domil_getKec"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col q-gutter-xs q-px-xs">
                  <app-autocomplete
                    v-model="store.form.domil_kecamatan"
                    outlined
                    valid
                    label="Kecamatan"
                    autocomplete="name"
                    :source="store.domil_kecs"
                    :disable="store.domil_kecs.length===0 || store.cekbox===true"
                    option-label="name"
                    option-value="name"
                    @set-model="store.domil_getKels"
                  />
                </div>
                <div class="col q-gutter-xs q-px-xs">
                  <app-autocomplete
                    v-model="store.form.domil_kelurahan"
                    outlined
                    valid
                    label="Kelurahan"
                    autocomplete="name"
                    :source="store.domil_kels"
                    :disable="store.domil_kecs.length===0 || store.cekbox===true"
                    option-label="name"
                    option-value="name"
                  />
                </div>
                <div class="col q-gutter-xs q-px-xs">
                  <app-input
                    v-model="store.form.domil_kodepos"
                    outlined
                    label="Kode Pos"
                    :disable="store.cekbox===true"
                  />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-step>

      <q-step
        :name="2"
        title="Ganti Password"
        caption="Wajib"
        icon="icon-mat-lock_reset"
        :done="store.step > 2"
      >
        <q-card>
          <q-card-section>
            <div class="row">
              <div class="col q-gutter-xs q-px-xs">
                <app-input
                  v-model="store.form.password_baru"
                  outlined
                  type="password"
                  label="Masukkan password baru"
                />
                <app-input
                  v-model="store.form.password_baru_confirmation"
                  outlined
                  type="password"
                  label="Konfirmasi password baru"
                />
              </div>
              <div class="col q-gutter-xs q-px-xs" />
            </div>
          </q-card-section>
        </q-card>
      </q-step>

      <template #navigation>
        <q-stepper-navigation class="q-gutter-md">
          <q-btn
            v-show="store.step < 2"
            color="primary"
            label="'Continue"
            @click="$refs.stepper.next()"
          />
          <q-btn
            v-if="store.step === 2"
            color="warning"
            label="Edit"
            :disable="store.disable"
            @click="lanjut"
          />
          <q-btn
            v-if="store.step > 1 "
            flat
            color="primary"
            label="Back"
            class="q-ml-sm"
            @click="$refs.stepper.previous()"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import AppInput from 'src/components/~global/AppInput.vue'
import { useAuthStore } from 'src/stores/auth'
import { useSurveyorFormStore } from 'src/stores/surveyor/form'

const store = useSurveyorFormStore()
const storeAuth = useAuthStore()
const error = ref(false)

store.getProvinces()
store.domil_getProvinces()
store.setToday()
store.getBidangSurvei()
function lanjut() {
  store.duplikatData()
}

// const toStep = computed(() => {
//   return store ? store.step : "3";
// });

onMounted(() => {
  const user = storeAuth.user
  store.getSurveyor(user)
})
</script>
<style scoped lang="scss">
.myBorder {
  border-left: 4px solid rgb(0, 0, 153);
  color: blue;
}
</style>

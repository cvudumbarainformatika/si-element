<template>
  <div>
    <q-page class="text-center">
      <q-card>
        <q-card-section>
          <div>
            <q-avatar
              size="180px"
              class="cursor-pointer float-center"
            >
              <q-img
                :src="imgUrl"
                class="cursor-pointer"
                @click="changeImage()"
              />
              <q-file
                ref="fileRef"
                v-model="tempImg"
                filled
                dense
                label="Profile Thumnail"
                accept="image/*"
                @update:model-value="simpanGambar"
              />
            </q-avatar>
            <q-btn
              round
              color="primary"
              size="xs"
              icon="icon-mat-photo_camera"
              class="float-bottom"
              style="top: 55px; right: 50px; transform: translateY(50%);"
            />
          </div>
          <q-badge
            floating
            color="primary"
          >
            <div class="text-h6">
              Profile
            </div>
          </q-badge>
          <div class="q-pt-md">
            <div class="text-h6">
              {{ storeAuth.user ? storeAuth.user.name :null }}
            </div>
            <p class="q-pt-xs">
              {{ storeAuth.user ? storeAuth.user.email :null }}
              <br>
              <q-toggle
                v-model="store.edited"
                label="edit"
              />
            </p>
          </div>
          <q-tabs
            v-model="store.tab"
            dense
            class="text-primary"
          >
            <q-tab
              name="biodatas"
              label="Biodata"
            />
            <q-tab
              name="berkass"
              label="Berkas"
            />
            <q-tab
              name="akuns"
              label="Akun"
            />
            <q-tab
              name="activitys"
              label="Activity"
            />
          </q-tabs>
        </q-card-section>

        <q-card-section v-show="store.tab==='biodatas'">
          <div v-if="storeAuth.user ? storeAuth.user.role==='surveyor':null">
            <div class="row">
              <div class="col-6">
                <div class="row">
                  <div class="col-12 q-gutter-y-sm">
                    <app-input
                      v-model="store.form.nik"
                      :readonly="!store.edited"
                      type="number"
                      label="Nomor Induk Kependudukan"
                      outlined
                      lazy-rules
                      :rules="[
                        (val) => (val !== null && val !== '') || 'Harap diisi',
                        (val) => (val.length <= 16 && val.length >= 16) || 'wajib 16 karakter',
                      ]"
                    />
                    <app-input
                      v-model="store.form.nama_lengkap"
                      label="Nama Lengkap"
                      outlined
                      :readonly="!store.edited"
                    />
                    <app-input
                      v-model="store.form.email"
                      label="Email"
                      type="email"
                      outlined
                      :readonly="!store.edited"
                    />
                  </div>
                </div>
                <div class="row q-gutter-y-sm">
                  <div class="col-6 q-gutter-y-sm q-pr-xs ">
                    <app-input
                      v-model="store.form.no_hp1"
                      type="number"
                      outlined
                      :readonly="!store.edited"
                      label="Nomor Hanphone 1"
                    />
                  </div>
                  <div class="col-6 q-gutter-y-sm ">
                    <app-input
                      v-model="store.form.no_hp2"
                      type="number"
                      outlined
                      :readonly="!store.edited"
                      label="Nomor Hanphone 2"
                    />
                  </div>
                </div>
                <div class="row q-gutter-y-sm">
                  <div class="col-4 q-gutter-y-sm ">
                    <app-input
                      v-model="store.form.tempat_lahir"
                      outlined
                      :readonly="!store.edited"
                      label="Tempat Lahir"
                    />
                  </div>
                  <div class="col-4 q-gutter-y-sm q-pl-xs">
                    <app-input-date
                      :readonly="!store.edited"
                      valid
                      :model="store.form.tanggal_lahir"
                      icon="icon-mat-event"
                      label="Tanggal Lahir"
                      outlined
                      @set-model="(val)=>store.setForm('tanggal_lahir', val)"
                    />
                  </div>
                  <div class="col-4 q-gutter-y-sm q-pl-xs">
                    <q-select
                      v-model="store.form.gender"
                      :readonly="!store.edited"
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
                <div class="row q-gutter-y-sm">
                  <div class="col-12 q-gutter-y-sm">
                    <app-input
                      v-model="store.form.alamat"
                      :readonly="!store.edited"
                      label="Alamat"
                      outlined
                    />
                  </div>
                </div>
                <div class="row q-gutter-y-sm">
                  <div class="col-6 q-gutter-y-sm q-pr-xs ">
                    <app-autocomplete
                      v-model="store.form.provinsi"
                      :readonly="!store.edited"
                      outlined
                      label="Provinsi"
                      autocomplete="name"
                      :source="store.provinces"
                      option-label="name"
                      option-value="name"
                      @set-model="store.getKota"
                    />
                  </div>
                  <div class="col-6 q-gutter-y-sm ">
                    <app-autocomplete
                      v-model="store.form.kabkot"
                      :readonly="!store.edited"
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
                <div class="row q-gutter-y-sm">
                  <div class="col-4 q-gutter-y-sm ">
                    <app-autocomplete
                      v-model="store.form.kecamatan"
                      :readonly="!store.edited"
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
                  <div class="col-4 q-gutter-y-sm q-pl-xs">
                    <app-autocomplete
                      v-model="store.form.kelurahan"
                      :readonly="!store.edited"
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
                  <div class="col-4 q-gutter-y-sm q-pl-xs">
                    <app-input
                      v-model="store.form.kodepos"
                      :readonly="!store.edited"
                      type="number"
                      outlined
                      label="Kode pos"
                    />
                  </div>
                </div>
              </div>
              <div class="col-6 q-pl-md">
                <div class="row">
                  <div class="col-6 q-gutter-y-sm q-pr-xs ">
                    <app-input
                      v-model="store.form.nama_npwp"
                      outlined
                      :readonly="!store.edited"
                      label="Nama NPWP"
                    />
                  </div>
                  <div class="col-6 q-gutter-y-sm ">
                    <q-select
                      v-model="store.form.status_kepegawaian"
                      :options="store.status_kepegawaians"
                      :readonly="!store.edited"
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
                <div class="row q-gutter-y-sm">
                  <div class="col-4 q-gutter-y-sm ">
                    <app-input
                      v-model="store.form.nama_buku_tabungan"
                      outlined
                      :readonly="!store.edited"
                      label="Nama di Buku Tabungan"
                    />
                  </div>
                  <div class="col-4 q-gutter-y-sm q-pl-xs">
                    <app-input
                      v-model="store.form.no_rekening"
                      :readonly="!store.edited"
                      type="number"
                      outlined
                      label="Nomor rekening"
                    />
                  </div>
                  <div class="col-4 q-gutter-y-sm q-pl-xs">
                    <app-input
                      v-model="store.form.nama_bank"
                      outlined
                      :readonly="!store.edited"
                      label="Nama BANK"
                    />
                  </div>
                </div>
                <div class="row q-gutter-y-sm">
                  <div class="col-5 q-gutter-y-sm ">
                    <app-input
                      v-model="store.form.no_asuransi_bpjs"
                      :readonly="!store.edited"
                      type="number"
                      label="Nomor asuransi BPJS"
                      outlined
                      lazy-rules
                      :rules="[
                        (val) => (val !== null && val !== '') || 'Harap diisi',
                        (val) => (val.length <= 16 && val.length >= 16) || 'wajib 16 karakter',
                      ]"
                    />
                  </div>
                  <div class="col-3 q-gutter-y-sm q-pl-xs">
                    <app-input
                      v-model="store.form.nilai_toefl"
                      :readonly="!store.edited"
                      type="number"
                      outlined
                      label="Nilai TOEFL"
                    />
                  </div>
                  <div class="col-4 q-gutter-y-sm q-pl-xs">
                    <q-select
                      v-model="store.form.agama"
                      :options="store.agamas"
                      :readonly="!store.edited"
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
                <div class="row q-gutter-y-sm">
                  <div class="col-6 q-gutter-y-sm q-pr-xs ">
                    <q-select
                      v-model="store.form.bidang_survei"
                      :options="store.bidang_surveis"
                      :readonly="!store.edited"
                      label="Pilih Bidang Survei"
                      dense
                      outlined
                      hide-bottom-space
                      no-error-icon
                      lazy-rules
                      :rules="[(val) => (val && val.length > 0) || 'Harap diisi']"
                    />
                  </div>
                  <div class="col-6 q-gutter-y-sm ">
                    <q-select
                      v-model="store.form.profesi"
                      :options="store.profesis"
                      :readonly="!store.edited"
                      label="Pilih Provesi"
                      dense
                      outlined
                      hide-bottom-space
                      no-error-icon
                      lazy-rules
                      :rules="[(val) => (val && val.length > 0) || 'Harap diisi']"
                    />
                  </div>
                </div>
                <div
                  v-show="store.edited"
                  class="row q-gutter-y-sm"
                >
                  <div class="col-12 q-gutter-y-sm text-left">
                    <q-checkbox
                      v-model="store.cekbox"
                      dense
                      label="Alamat domisili sama dengan alamat KTP"
                      color="primary"
                    />
                  </div>
                </div>
                <div class="row q-gutter-y-sm">
                  <div class="col-12 q-gutter-y-sm">
                    <app-input
                      v-model="store.form.domil_alamat"
                      :readonly="!store.edited"
                      outlined
                      label="Alamat Domisili"
                    />
                  </div>
                </div>
                <div class="row q-gutter-y-sm">
                  <div class="col-6 q-gutter-y-sm q-pr-xs ">
                    <app-autocomplete
                      v-model="store.form.domil_provinsi"
                      :readonly="!store.edited"
                      outlined
                      label="Provinsi"
                      autocomplete="name"
                      :source="store.domil_provinces"
                      option-label="name"
                      option-value="name"
                      @set-model="store.domil_getKota"
                    />
                  </div>
                  <div class="col-6 q-gutter-y-sm ">
                    <app-autocomplete
                      v-model="store.form.domil_kabkot"
                      :readonly="!store.edited"
                      outlined
                      valid
                      label="Kabupaten / Kota"
                      autocomplete="name"
                      :source="store.domil_kotas"
                      :disable="store.domil_kotas.length===0"
                      option-label="name"
                      option-value="name"
                      @set-model="store.domil_getKec"
                    />
                  </div>
                </div>
                <div class="row q-gutter-y-sm">
                  <div class="col-4 q-gutter-y-sm ">
                    <app-autocomplete
                      v-model="store.form.domil_kecamatan"
                      :readonly="!store.edited"
                      outlined
                      valid
                      label="Kecamatan"
                      autocomplete="name"
                      :source="store.domil_kecs"
                      :disable="store.domil_kecs.length===0 "
                      option-label="name"
                      option-value="name"
                      @set-model="store.domil_getKels"
                    />
                  </div>
                  <div class="col-4 q-gutter-y-sm q-pl-xs">
                    <app-autocomplete
                      v-model="store.form.domil_kelurahan"
                      :readonly="!store.edited"
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
                  <div class="col-4 q-gutter-y-sm q-pl-xs">
                    <app-input
                      v-model="store.form.domil_kodepos"
                      :readonly="!store.edited"
                      outlined
                      label="Kode Pos"
                    />
                  </div>
                </div>
                <div
                  v-show="store.edited"
                  class="col q-pt-lg"
                >
                  <div class="text-center q-gutter-sm">
                    <app-btn
                      color="grey"
                      class="text-black"
                      label="Batal"
                      @click="onReset"
                    />
                    <app-btn
                      type="submit"
                      label="Simpan"
                      :loading="store.loading"
                      @click="onSubmit"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <h6>Admin</h6>
          </div>
        </q-card-section>

        <q-card-section v-show="store.tab==='berkass'">
          <div>
            <q-card
              class="text-primary myBorder"
            >
              <q-card-section>
                <div class="text-h6">
                  Berkas
                </div>
                <!-- <p> deskripsi</p> -->
              </q-card-section>
            </q-card>
          </div>
        </q-card-section>
        <q-card-section v-show="store.tab==='akuns'">
          <div>
            <q-card
              class="text-primary myBorder"
            >
              <q-card-section>
                <div class="text-h6">
                  Akun
                </div>
                <!-- <p> deskripsi</p> -->
              </q-card-section>
            </q-card>
          </div>
        </q-card-section>
        <q-card-section v-show="store.tab==='activitys'">
          <div>
            <q-card
              class="text-primary myBorder"
            >
              <q-card-section>
                <div class="text-h6">
                  Aktiftas akun
                </div>
                <!-- <p> deskripsi</p> -->
              </q-card-section>
            </q-card>
          </div>
        </q-card-section>
      </q-card>
    </q-page>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useSurveyorFormStore } from 'src/stores/surveyor/form'
import { api, storageServer } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

const store = useSurveyorFormStore()
const storeAuth = useAuthStore()

const currentUser = storeAuth.user
const fileRef = ref(null)
const tempImg = ref(null)

const imgUrl = ref(storeAuth.user.photo ? (storageServer + storeAuth.user.photo) : new URL('../../../assets/images/actor.svg', import.meta.url).href)
console.log('imge name', imgUrl)
watch(() => storeAuth.user, (apem) => {
  // console.log('watch apem', apem)
  if (apem) {
    imgUrl.value = apem.photo !== null ? (storageServer + apem.photo) : new URL('../../../assets/images/actor.svg', import.meta.url).href
  } else {
    imgUrl.value = new URL('../../../assets/images/actor.svg', import.meta.url).href
  }
})

store.getProvinces()
store.domil_getProvinces()
store.setToday()

function onSubmit() {
  store.duplikatDataProfil()
}

function changeImage() {
  fileRef.value.pickFiles()
}
const simpanGambar = () => {
  // console.log('simpan GaMN', tempImg.value.name)
  // const form = {
  //   satu: 'aja',
  //   id: currentUser.id
  // }
  const form = new FormData()
  form.append('id', currentUser.id)
  form.append('gambar', tempImg.value)
  // console.log('simpan', tempImg.val)
  return new Promise((resolve, reject) => {
    // api.post('v1/user/upload', form)
    api.post('v1/user/upload', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(resp => {
        notifSuccess(resp)
        console.log('image resp', resp)
        storeAuth.getUser()
        tempImg.value = null
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function onReset() {
  const user = storeAuth.user
  store.getSurveyor(user)
  store.edited = false
}

onMounted(() => {
  const user = storeAuth.user
  store.cekIdProfil(user)
})

</script>
<style scoped lang="scss">
.myBorder {
  border-left: 4px solid rgb(0, 0, 153);
  color: blue;
}
.myBtn{
  z-index: 50 !important;
}
</style>

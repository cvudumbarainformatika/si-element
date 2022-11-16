<template>
  <q-page class="flex column flex-center">
    <q-card
      flat
      bordered
      class="card-login"
    >
      <q-card-section>
        <div
          class="text-center"
          style="margin-top:30px"
        >
          <q-avatar size="100px">
            <img src="~assets/images/lipa.png">
          </q-avatar>
          <div class="text-h6 text-white">
            Registrasi Puskesmas
          </div>
          <div class="text-white">
            Silahkan Anda Registrasi Terlebih Dahulu
          </div>
        </div>
        <q-form
          ref="myForm"
          class="q-pa-md"
          style="margin-top:70px"
          @submit="onSubmit"
        >
          <div class="q-gutter-sm">
            <app-input
              v-model="storeForm.form.nik"
              label="nik"
              type="number"
              icon="icon-mat-pin"
              lazy-rules
              :rules="[
                (val) => (val !== null && val !== '') || 'Harap diisi',
                (val) => (val.length <= 16 && val.length >= 16) || 'wajib 16 karakter',
              ]"
            />
            <app-input
              v-model="storeForm.form.nama_lengkap"
              label="nama"
              icon="icon-mat-person"
            />
            <app-input
              v-model="storeForm.form.email"
              dense
              label="email"
              validator="email"
              icon="icon-mat-email"
            />
          </div>
          <div style="margin-top:50px">
            <app-btn
              type="submit"
              :loading="storeForm.loading"
              class="full-width"
              label="Registrasi"
            />
          </div>
        </q-form>
        <div class="q-pt-md">
          <p
            class="text-primary text-center cursor-pointer"
            @click="toLogin"
          >
            Login
          </p>
        </div>
      </q-card-section>
      <div class="float-bottom q-px-md text-grey-6">
        <q-separator />
        <div class="">
          Aplikasi LIPA MITRA ini
          tidak di perjualbelikan secara bebas tanpa seizin dari pembuatnya.
        </div>
        <div class="q-mt-lg q-pb-xs text-right f-14">
          LIPA MITRA Versi BETA
        </div>
      </div>
    </q-card>
  </q-page>
</template>
<script setup>
import { ref } from 'vue'
// import { useQuasar } from 'quasar'
// import { useAuthStore } from 'src/stores/auth'
import { usePrapuskesmasForm } from 'src/stores/puskesmas/prapuskesmas/form'
import { routerInstance } from 'src/boot/router'

// const storeAuth = useAuthStore()
const storeForm = usePrapuskesmasForm()
// const $q = useQuasar()

const myForm = ref(null)
// const form = ref({
//   nik: '',
//   nama: '',
//   email: '',
//   device_name: $q.platform.is.name + '-' + $q.platform.is.platform
// })

function onSubmit () {
  // storeForm.addRegister()
  console.log('form', storeForm.form)
  myForm.value.resetValidation()
}
function toLogin() {
  routerInstance.replace('/login')
}

</script>

<style lang="scss" scoped>
.card-login {
  width:360px;
  min-height:600px;
  overflow: hidden;
  position: relative;
    &::before {
      content: "";
      width:360px;
      height:240px;
      position: absolute;
      border-radius: 0 0 50% 50%;
      background: linear-gradient(-45deg, $secondary, $primary);
      overflow: hidden;
    }
}

@media(max-width:800px){
    .card-login {
        width: 100vw;
        height:100vh;
        border-radius: 0px;
          &::before {
            width: 100vw;
          }
    }
}
</style>

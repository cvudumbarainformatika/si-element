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
            Halaman Login
          </div>
          <div class="text-white">
            Silahkan Anda Login Terlebih Dahulu
          </div>
        </div>
        <q-form
          ref="myForm"
          class="q-pa-md"
          style="margin-top:70px"
          @submit="onSubmit"
        >
          <app-input
            v-model="form.email"
            dense
            label="email"
            validator="email"
            icon="icon-mat-email"
          />
          <app-input
            v-model="form.password"
            dense
            type="password"
            label="password"
            icon="icon-mat-key"
            class="q-mt-sm"
          />

          <div style="margin-top:50px">
            <app-btn
              type="submit"
              :loading="storeAuth.loading"
              class="full-width"
              label="Login"
            />
          </div>
        </q-form>
        <div class="q-pt-md flex flex-center q-gutter-x-xl">
          <p
            class="text-primary text-center cursor-pointer"
            @click="toRegSurveyor"
          >
            <small> Surveyor</small>
          </p>
          <p
            class="text-primary text-center q-pb-md"
          >
            REGISTRASI
          </p>
          <p
            class="text-primary text-center cursor-pointer"
            @click="toRegPuskesmas"
          >
            <small> Puskesmas</small>
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
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth'
import { routerInstance } from 'src/boot/router'

const storeAuth = useAuthStore()
const $q = useQuasar()

const myForm = ref(null)
const form = ref({
  email: '',
  password: '',
  device_name: $q.platform.is.name + '-' + $q.platform.is.platform
})

function onSubmit () {
  storeAuth.login(form.value)
}

function toRegSurveyor() {
  routerInstance.replace('/registrasi')
}
function toRegPuskesmas() {
  routerInstance.replace('/regpuskesmas')
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
      height:230px;
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

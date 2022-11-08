<template>
  <q-dialog persistent>
    <app-card
      class="my-card"
      title="Form User"
      desc="Input Data User"
    >
      <template #content>
        <!-- <q-form ref="formReff" @submit="onSubmit" @reset="onReset"> -->
        <q-form
          ref="formReff"
          @submit="onSubmit"
          @reset="onReset"
        >
          <div>
            <div class="q-gutter-xs">
              <app-input
                v-model="store.form.name"
                label="Nama"
                outlined
              />
              <app-input
                v-model="store.form.email"
                label="Email"
                type="email"
                outlined
                :disable="store.edited"
              />
              <q-select
                v-model="store.form.role"
                :options="store.roles"
                label="Pilih Role"
                dense
                outlined
                hide-bottom-space
                no-error-icon
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Harap diisi']"
              />
              <q-select
                v-model="store.form.status"
                :options="store.statused"
                label="Pilih Status"
                dense
                outlined
                hide-bottom-space
                no-error-icon
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Harap diisi']"
              />
              <app-input
                v-model="store.form.password"
                label="Password"
                type="password"
                outlined
              />
            </div>
          </div>
          <q-separator class="q-my-md" />
          <div class="text-right">
            <app-btn
              type="reset"
              color="dark"
              label="cancel"
              class="q-mr-md"
            />
            <app-btn label="Simpan" />
          </div>
        </q-form>
      </template>
    </app-card>
  </q-dialog>
</template>
<script setup>
import { ref } from 'vue'
import { useUserForm } from 'src/stores/user/form'

const store = useUserForm()
const formReff = ref(null)

function onSubmit() {
  store.saveForm().then(() => {
    console.log('form', formReff)
    formReff.value.resetValidation()
  })
}

function onReset() {
  formReff.value.resetValidation()
  store.setOpen()
}
</script>
<style lang="scss" scoped>
.my-card{
  width: 360px !important;
}
</style>

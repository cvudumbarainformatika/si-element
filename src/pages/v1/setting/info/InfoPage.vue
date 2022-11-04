<template>
  <div>
    <app-card
      title="Data Info"
      desc="Infomasi mengenai Aplikasi"
      class="q-px-lg q-pb-lg"
    >
      <template #content>
        <div class="row q-col-gutter-sm">
          <div class="col-sm-5 col-xs-12">
            <app-input
              v-model="setting.infos.nama"
              class="q-mb-sm"
              label="Nama Aplikasi"
              outlined
              :loading="setting.loading"
            />
            <app-input
              v-model="setting.infos.alamat"
              class="q-mb-sm"
              label="Alamat Aplikasi"
              outlined
              :loading="setting.loading"
            />
            <app-input
              v-model="setting.infos.tlp"
              class="q-mb-sm"
              label="Telepon Aplikasi"
              outlined
              :loading="setting.loading"
            />
            <app-input
              v-model="setting.infos.pemilik"
              class="q-mb-sm"
              label="Pemilik Aplikasi"
              outlined
              :loading="setting.loading"
            />
            <div class="text-right">
              <app-btn
                label="Simpan"
                :loading="setting.loading"
                @click="setting.saveSetting"
              />
            </div>
          </div>
        </div>
      </template>
    </app-card>
  </div>
</template>
<script setup>
import { useAppSettingStore } from 'src/stores/appsetting/appsetting'
const setting = useAppSettingStore()
</script>

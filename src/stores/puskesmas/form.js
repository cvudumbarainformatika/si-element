import { defineStore } from 'pinia'

export const usePuskesmasFormStore = defineStore('puskesmas_form', {
  state: () => ({
    isOpen: false

  }),
  actions: {
    async konfirmasiData() {
      console.log('ok')
    },
    async newData() {
      console.log('ok')
    },
    async editData() {
      console.log('ok')
    }
  }
})

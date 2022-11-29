import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { routerInstance } from 'src/boot/router'
import { notifSuccess } from 'src/modules/utils'

export const usePrapuskesmasForm = defineStore('prapuskesmas_form', {
  state: () => ({
    isOpen: false,
    form: {
      nomor: '',
      nama: '',
      email: ''
    },
    loading: false
  }),

  actions: {
    async addRegister() {
      this.loading = true
      try {
        await api.post('v1/public/puskesmasuser', this.form).then(resp => {
          notifSuccess(resp)
          this.form = {}
          this.loading = false
          routerInstance.replace('/notifregistrasi')
        })
      } catch (error) {
        this.loading = false
      }
    }
  }
})

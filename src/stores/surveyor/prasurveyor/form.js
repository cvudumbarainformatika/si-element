import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { routerInstance } from 'src/boot/router'
import { notifSuccess } from 'src/modules/utils'

export const usePrasurveyorForm = defineStore('prasurveyor_form', {
  state: () => ({
    isOpen: false,
    form: {
      nik: '',
      nama_lengkap: '',
      email: ''
    },
    loading: false
  }),
  actions: {
    async addRegister() {
      this.loading = true
      try {
        await api.post('/v1/public/surveyoruser', this.form).then(resp => {
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

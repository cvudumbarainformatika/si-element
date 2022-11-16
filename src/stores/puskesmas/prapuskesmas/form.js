import { defineStore } from 'pinia'

export const usePrapuskesmasForm = defineStore('prapuskesmas_form', {
  state: () => ({
    isOpen: false,
    form: {
      nik: '',
      nama_lengkap: '',
      email: ''
    },
    loading: false
  })
})

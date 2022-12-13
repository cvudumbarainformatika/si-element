import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'
import { useProvesiTable } from './table'

export const useProvesiFormStore = defineStore('provesi_form', {
  state: () => ({
    isOpen: false,
    form: {
      nama: ''
    },
    loading: false,
    tab: ''
  }),
  actions: {
    setForm(name, val) {
      this.form[name] = val
    },
    setOpen() {
      this.isOpen = !this.isOpen
    },
    resetFORM() {
      this.form = {}
      const columns = ['nama']
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], '')
      }
    },
    newData() {
      this.resetFORM()
      this.isOpen = !this.isOpen
    },
    async saveForm() {
      this.loading = true
      try {
        const resp = await api.post('/v1/provesi/store', this.form)
        notifSuccess(resp)
        this.setOpen()
        const table = useProvesiTable()
        table.getDataTable()
        this.resetFORM()
        this.loading = false
        this.tab = 'provesi'
      } catch (error) {
        this.tab = 'provesi'
        this.loading = false
      }
    },
    editData(val) {
      const keys = Object.keys(val)
      keys.forEach((key, index) => {
        this.setForm(key, val[key])
      })
      this.isOpen = !this.isOpen
    }
  }
})

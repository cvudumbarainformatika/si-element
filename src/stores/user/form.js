import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'
import { useUserTable } from './table'

export const useUserForm = defineStore('user_form', {
  state: () => ({
    isOpen: false,
    form: {
      name: '',
      email: '',
      // password: '',
      role: 'admin',
      status: 'aktif'
    },
    statused: ['aktif', 'tidak aktif'],
    roles: ['admin', 'surveyor'],
    edited: false,
    loading: false,
    loadingSelect: false
  }),
  actions: {
    resetFORM() {
      this.form = {}
      const columns = ['name', 'email', 'role', 'status', 'password']
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], '')
      }
      this.setForm('role', 'admin')
      this.setForm('status', 'aktif')
    },

    setForm(name, val) {
      this.form[name] = val
    },

    setOpen() {
      this.isOpen = !this.isOpen
    },

    newData() {
      this.resetFORM()
      this.edited = false
      this.isOpen = !this.isOpen
    },

    async saveForm() {
      this.loading = true
      try {
        const resp = await api.post('/v1/user/store', this.form)
        console.log('simpan data', resp)
        notifSuccess(resp)
        this.setOpen()
        const table = useUserTable()
        table.getDataTable()
        this.resetFORM()
        this.loading = false
        return new Promise((resolve) => {
          resolve(resp)
        })
      } catch (error) {
        this.loading = false
      }
    },

    editData(val) {
      console.log('editdata', val)
      const keys = Object.keys(val)
      keys.forEach((key, index) => {
        this.setForm(key, val[key])
      })
      // kecuali yang ada di object user
      this.isOpen = !this.isOpen
      console.log('open', this.isOpen)
    }
  }
})

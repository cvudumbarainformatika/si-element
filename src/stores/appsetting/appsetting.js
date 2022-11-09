import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useAppSettingStore = defineStore('app_setting', {
  state: () => ({
    loading: false,
    menus: [
      {
        id: 1,
        nama: 'dashboard',
        name: 'dashboard',
        link: 'dashboard',
        icon: 'icon-mat-dashboard',
        submenus: [],
        rules: [
          {
            id: 1,
            name: 'admin'
          },
          {
            id: 2,
            name: 'surveyor'
          }
        ]
      },
      {
        id: 2,
        nama: 'surveyor',
        name: 'surveyor',
        link: 'surveyor',
        icon: 'icon-mat-supervisor_account',
        submenus: [],
        rules: [
          {
            id: 1,
            name: 'admin'
          }
        ]
      },
      {
        id: 3,
        nama: 'user',
        name: 'user',
        link: 'user',
        icon: 'icon-mat-person',
        submenus: [],
        rules: [
          {
            id: 1,
            name: 'admin'
          }
        ]
      },
      {
        id: 4,
        nama: 'setting',
        name: 'setting',
        link: 'setting',
        icon: 'icon-mat-settings',
        submenus: [
          {
            id: 1,
            nama: 'info',
            name: 'setting.info',
            link: 'setting/info',
            icon: ''
          },
          {
            id: 2,
            nama: 'themes',
            name: 'setting.themes',
            link: 'setting/themes',
            icon: ''
          }
        ],
        rules: [
          {
            id: 1,
            name: 'admin'
          }
        ]
      }
    ],
    form: { nama: 'Si-Element' },
    infos: [],
    themes: []
  }),
  actions: {
    setInfo(key, val) {
      this.info[key] = val
    },
    setTheme(key, val) {
      this.themes[key].value = val
      this.saveSetting()
    },
    // api related function
    getInitialData() {
      this.getDataSetting()
    },

    getDataSetting() {
      return new Promise((resolve, reject) => {
        api
          .get('v1/setting/all')
          .then((resp) => {
            console.log('setting', resp.data)
            // this.menus = resp.data[0].menus
            // this.levels = resp.data[0].levels
            this.themes = resp.data.themes
            this.infos = resp.data.infos
            // this.info = this.infos
            resolve(resp)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    saveSetting() {
      this.form.menus = this.menus
      this.form.infos = this.infos
      // this.form.levels = this.levels
      this.form.themes = this.themes
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/setting/store', this.form)
          .then((resp) => {
            this.loading = false
            // console.log('simpan', resp)
            this.getDataSetting()
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})

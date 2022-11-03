import { defineStore } from 'pinia'

export const useAppSettingStore = defineStore('app_setting', {
  state: () => ({
    menus: [
      {
        id: 1,
        nama: 'dashboard',
        name: 'dashboard',
        link: 'dashboard',
        icon: 'icon-mat-dashboard',
        submenus: []
      },
      {
        id: 2,
        nama: 'surveyor',
        name: 'surveyor',
        link: 'surveyor',
        icon: 'icon-mat-supervisor_account',
        submenus: []
      },
      {
        id: 3,
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
          }
        ]
      }
    ]
  }),
  actions: {}
})

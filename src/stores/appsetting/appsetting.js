import { defineStore } from 'pinia'

export const useAppSettingStore = defineStore('app_setting', {
  state: () => ({
    menus: [
      {
        id: 1,
        name: 'dashboard',
        link: 'dashboard',
        icon: 'icon-mat-dashboard'
      },
      {
        id: 2,
        name: 'surveyor',
        link: 'surveyor',
        icon: 'icon-mat-supervisor_account'
      }
    ]
  }),
  actions: {}
})

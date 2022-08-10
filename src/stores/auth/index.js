import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import * as storage from 'src/modules/storage'
import { routerInstance } from 'src/boot/router'
import { waitLoad } from 'src/modules/utils'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    state: () => ({
      token: localStorage.getItem('token') ? storage.getLocalToken() : null,
      user: localStorage.getItem('user') ? storage.getUser() : null,
      loading: false
    })
  }),
  getters: {
    isAuth (state) {
      return state.token !== null || state.token !== undefined
    },
    getToken: () => storage.getLocalToken(),
    userGetter: () => storage.getUser() !== null || storage.getUser() !== undefined
  },
  actions: {
    async login (payload) {
      this.loading = true
      waitLoad('show')
      try {
        await api.post('/v1/login', payload).then(resp => {
          storage.setLocalToken(resp.data.token)
          storage.setUser(resp.data.user)
          const hdd = storage.getLocalToken()
          const hddUser = storage.getUser()
          if (hdd) {
            this.SET_TOKEN_USER(hdd, hddUser)
          }
          this.loading = false
          waitLoad('done')
        })
      } catch (error) {
        waitLoad('done')
        this.loading = false
        // console.log('err login', error.response)
        // notifErr(error.response)
      }
    },
    SET_TOKEN_USER (token, user) {
      storage.setHeaderToken(token)
      this.token = token
      this.user = user
      this.loading = false
      routerInstance.push('/')
    },
    REMOVE_LOKAL () {
      storage.deleteLocalToken()
      storage.deleteHeaderToken()
      storage.deleteUser()
      this.user = null
      this.token = ''
    },
    async getUser () {
      await api.get('/v1/me').then(resp => {
        console.log('me', resp)
        storage.setUser(resp.data.result)
        this.user = resp.data.result
      })
    },

    async logout () {
      waitLoad('show')
      try {
        await api.post('/v1/logout').then(resp => {
          this.REMOVE_LOKAL()
          routerInstance.replace('/login')
          waitLoad('done')
        })
      } catch (error) {
        console.log(error)
        waitLoad('done')
      }
    }
  }
})

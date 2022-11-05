import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { getLocalToken } from 'src/modules/storage'
import { noftifResp, notifErr } from 'src/modules/utils'
import { setCssVar } from 'quasar'

// const SERVER = 'http://api.si-element.test'
const SERVER = 'http://192.168.0.110/api.si-element/public'
// const SERVER = 'https://server.udumbarainformatika.my.id/api'
const base = SERVER + '/api'
const storageServer = SERVER + '/storage/'

const api = axios.create({ baseURL: base })
api.defaults.headers.get.Accepts = 'application/json'

api.defaults.headers.common.Authorization = `Bearer ${getLocalToken()}`

/* Response Interceptors */
const interceptResErrors = (err) => {
  try {
    // check for response code 123 and redirect to login
    // err = Object.assign(new Error(), { message: err.response.data })
    // console.log('1. interceptResErrors', err.response)
    notifErr(err.response)
  } catch (e) {
    // check for response code 123 and redirect to login
    // Will return err if something goes wrong
    console.log('1. catch', e)
  }
  return Promise.reject(err)
}
const interceptResponse = (res) => {
  try {
    // check for response code 123 and redirect to login
    // console.log('2. interceptResponse', res)
    noftifResp(res)
    return Promise.resolve(res)
  } catch (e) {
    // check for response code 123 and redirect to login
    console.log('2. catch interceptResponse', res)
    return Promise.resolve(res)
  }
}
api.interceptors.response.use(interceptResponse, interceptResErrors)

/* Request Interceptors */
const interceptReqErrors = err => Promise.reject(err)
const interceptRequest = (config) => {
  return config
}
api.interceptors.request.use(interceptRequest, interceptReqErrors)

const getDataSetting = () => {
  return new Promise((resolve) => {
    api.get('v1/public/info').then((resp) => {
      // console.log('setting axios', resp.data.themes)
      const themes = resp.data.themes
      for (let i = 0; i < themes.length; i++) {
        setCssVar(themes[i].name, themes[i].value)
      }
      resolve(resp)
    })
  })
}
export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
  getDataSetting()
})

// eslint-disable-next-line no-return-assign
const setToken = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}
const deleteToken = () => delete api.defaults.headers.common.Authorization

export { axios, api, setToken, deleteToken, storageServer }

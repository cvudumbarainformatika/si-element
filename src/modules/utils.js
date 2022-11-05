import { Notify, Loading, QSpinnerCube } from 'quasar'
import { routerInstance } from 'boot/router'
import * as storage from 'src/modules/storage'

const removeToken = () => {
  storage.deleteLocalToken()
  storage.deleteHeaderToken()
  storage.deleteUser()
  routerInstance.replace('/login')
}

const hapusToken = () => {
  storage.deleteLocalToken()
  storage.deleteHeaderToken()
}
const insertToken = (token) => {
  storage.setLocalToken(token)
  storage.setHeaderToken(token)
}

const noftifResp = (resp) => {
  localStorage.setItem('attempt', 1)
  // console.log('aq ga error', resp)
  // if (resp.status === 202) {
  //   storage.setLocalToken(resp.data.token)
  // }
}

const notifErr = (resp, next) => {
  // const msg = resp ? resp.data.message : 'Ada Kesalahan, Harap ulangi!'
  const status = resp ? resp.status : 500

  // unauthenticated
  console.log('utility', resp)
  if (resp.status === 401 && resp.statusText === 'Unauthorized') {
    return removeToken()
  }

  //   if (status === 200) {
  if (status === 402) {
    hapusToken()
    console.log('anyar mas', resp)
    insertToken(resp.data.token)
    // return next()resp.status
    if (resp.config.url !== '/v1/auth/profile') {
      Notify.create({
        message: 'ada kesalahan, harap ulangi',
        icon: 'icon-eva-message_circle_outline',
        position: 'bottom-right',
        color: 'negative',
        actions: [
          {
            label: 'Dismiss',
            color: 'yellow',
            handler: () => {
              /* console.log('wooow') */
            }
          }
        ]
      })
    };
  } else if (status === 422) {
    const msgs = resp.data
    for (const key in msgs) {
      Notify.create({
        message: msgs[key][0],
        icon: 'icon-eva-message_circle_outline',
        position: 'bottom-right',
        color: 'negative',
        actions: [
          { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
        ]
      })
    }
  } else {
    const attempt = parseFloat(localStorage.getItem('attempt'))
    console.log('attempt', attempt)
    if (attempt === 1) {
      Notify.create({
        message: 'Ada Kesalahan Harap ulangi',
        icon: 'icon-eva-message_circle_outline',
        position: 'bottom-right',
        color: 'negative',
        actions: [
          {
            label: 'Dismiss',
            color: 'yellow',
            handler: () => {
              /* console.log('wooow') */
            }
          }
        ]
      })
    } else {
      Notify.create({
        message: 'Ada Kesalahan, Coba Refresh',
        icon: 'icon-eva-message_circle_outline',
        position: 'bottom-right',
        color: 'negative',
        actions: [
          {
            label: 'Dismiss',
            color: 'yellow',
            handler: () => {
              /* console.log('wooow') */
            }
          }
        ]
      })
    }
    const toAtt = attempt + 1
    localStorage.setItem('attempt', toAtt)
  }
}
const notifSuccess = (resp) => {
  const msg = resp ? resp.data.message : 'Sucees!, Wow Kerja Bagus!'
  Notify.create({
    message: msg || 'Sucees!, Wow Kerja Bagus!',
    icon: 'icon-mat-thumb_up_off_alt',
    position: 'top-right',
    color: 'positive',
    actions: [
      { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
    ]
  })
}
const notifSuccessVue = (msa) => {
  Notify.create({
    message: msa || 'Sucees!',
    icon: 'icon-mat-thumb_up_off_alt',
    position: 'top-right',
    color: 'positive',
    actions: [
      { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
    ]
  })
}
const notifErrVue = (msg) => {
  Notify.create({
    message: msg,
    icon: 'icon-eva-message_circle_outline',
    position: 'bottom-right',
    color: 'negative',
    actions: [
      { label: 'Dismiss', color: 'warning', handler: () => { /* console.log('wooow') */ } }
    ]
  })
}

const waitLoad = (cond) => {
  if (cond === 'show') {
    Loading.show({
      message: 'Harap bersabar. Menunggu...',
      boxClass: 'bg-dark text-white',
      spinner: QSpinnerCube,
      // spinnerColor: 'yellow',
      spinnerSize: 30
    })
  } else {
    Loading.hide()
  }
}

export {
  notifSuccess,
  notifErr,
  notifErrVue,
  waitLoad,
  noftifResp,
  notifSuccessVue
}

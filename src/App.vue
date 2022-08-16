<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

import customIcons from 'src/custom-icons/custom-icons'
const host = 'server.udumbarainformatika.my.id'

window.Pusher = Pusher

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'pusher_app_key_harry141312',
  cluster: 'mt1',
  wsHost: host,
  encrypted: true,
  wssPort: 3456,
  wsPort: 3456,
  disableStats: true,
  forceTLS: true, // default true
  enabledTransports: ['ws', 'wss']
  // disabledTransports: ['sockjs', 'xhr_polling', 'xhr_streaming']
})

// document.addEventListener('DOMContentLoaded', function(event) {
//   Echo.channel('notification')
//     .listen('NotificationEvent', (e) => {
//       console.log(e)
//     })
// })

const channel = window.Echo.channel('public.notification.1')
channel.subscribed(() => {
  console.log('subscribed!!!')
}).listen('.notification', (e) => {
  console.log(e)
})
// channel.listen('notification', (e) => {
//   console.log(e)
// })

export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar()
    // console.log($q.dark.isActive)
    $q.dark.set(false)
    $q.iconSet.set(customIcons)
    document.body.setAttribute(['data-theme'], 'custom')

    // document.addEventListener('DOMContentLoaded', function(event) {
    //   Echo.channel('notification')
    //     .listen('NotificationEvent', (e) => {
    //       console.log(e)
    //     })
    // })
  }
})
</script>

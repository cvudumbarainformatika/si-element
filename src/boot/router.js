import { boot } from 'quasar/wrappers'

let routerInstance = null

export default boot(({ router }) => {
  routerInstance = router
})

export { routerInstance }

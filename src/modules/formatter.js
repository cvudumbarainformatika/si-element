import { date } from 'quasar'

const dateDbFormat = (val) => {
  return date.formatDate(val, 'YYYY-MM-DD')
}

export { dateDbFormat }

import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const usePuskesmasTable = defineStore('puskesmas_table', {
  state: () => ({
    items: [],
    meta: {},
    item: {},
    loading: false,
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'desc'
    },
    columns: [],
    columnHide: ['id', 'user_id', 'kabkot', 'kecamatan', 'kelurahan', 'kodepos', 'provinsi', 'created_at', 'updated_at']
  }),
  getters: {
    getterColumns(state) {
      return state.columns.filter((el) => !state.columnHide.includes(el))
    }
  },
  actions: {
    setSearch(val) {
      this.params.q = val
      this.getDataTable()
    },
    setOrder(payload) {
      this.params.order_by = payload
      this.params.sort === 'desc' ? this.params.sort = 'asc' : this.params.sort = 'desc'
      this.getDataTable()
    },
    setPage(payload) {
      console.log('setPage', payload)
      this.params.page = payload
      this.getDataTable()
    },
    setPerPage(payload) {
      this.params.per_page = payload
      this.params.page = 1
      this.getDataTable()
    },
    setColumns(payload) {
      const thumb = payload.map(x => Object.keys(x))
      this.columns = thumb[0]
    },
    refreshTable() {
      this.params.page = 1
      this.getDataTable()
    },
    async getDataTable() {
      this.loading = true
      const params = { params: this.params }
      try {
        await api.get('/v1/puskesmas/all', params).then(resp => {
          console.log('items', resp.data)
          if (resp.status === 200) {
            this.items = resp.data.data
            this.meta = resp.data
            this.setColumns(resp.data.data)
            this.loading = false
          }
        })
      } catch (err) {
        this.loading = false
      }
    },

    async deletesData(payload) {
      const params = { id: payload }
      try {
        console.log('params delete', params)
      } catch (error) {

      }
    }
  }
})

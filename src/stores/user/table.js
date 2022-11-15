import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// import { notifErr, notifSuccess } from 'src/modules/utils'

export const useUserTable = defineStore('user_table', {
  state: () => ({
    items: [],
    meta: {},
    loading: false,
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'desc'
    },
    columns: [],
    columnHide: [
      'id', 'created_at', 'email_verified_at', 'password', 'remember_token', 'updated_at'
    ]
  }),
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
      console.log('setpage', payload)
      this.params.page = payload
      this.getDataTable()
    },
    setPerPage(payload) {
      this.params.per_page = payload
      this.params.page = 1
      this.getDataTable()
    },
    setColums(payload) {
      const thumb = payload.map(x => Object.keys(x))
      this.columns = thumb[0]
    },
    refreshTable() {
      this.params.page = 1
      this.params.q = ''
      this.getDataTable()
    },
    async getDataTable() {
      this.loading = true
      const params = { params: this.params }
      try {
        await api.get('/v1/user/all', params).then(resp => {
          console.log('userdata', resp.data)
          if (resp.status === 200) {
            this.items = resp.data.data
            this.meta = resp.data
            this.setColums(resp.data.data)
            this.loading = false
          }
        })
      } catch (error) {
        this.loading = false
      }
    }

    // async deletesData(payload) {
    //   const params = { id: payload }
    //   try {
    //     await api.post('/v1/user/destroy', params).then(resp => {
    //       notifSuccess(resp)
    //       this.getDataTable()
    //     })
    //   } catch (error) {
    //     console.log('errDelete', error.response)
    //     notifErr(error.response)
    //   }
    // }
  }

})

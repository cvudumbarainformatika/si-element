import { defineStore } from 'pinia'
import {
  axios,
  api
} from 'boot/axios'
// import { routerInstance } from 'src/boot/router'
import { notifSuccess } from 'src/modules/utils'
import { useSurveyorTable } from 'src/stores/surveyor/table'
import { routerInstance } from 'src/boot/router'
// import { useAuthStore } from './auth'
// import { Dialog } from 'quasar'

export const useSurveyorFormStore = defineStore('surveyor_form', {
  state: () => ({
    isOpen: false,
    user: null,
    form: {
      nik: '',
      nama_lengkap: '',
      email: '',
      password_baru: '',
      password_baru_confirmation: '',
      tempat_lahir: '',
      tanggal_lahir: '',
      gender: 'L',
      agama: 'Islam',
      no_hp1: '',
      no_hp2: '',
      nama_npwp: '',
      nama_bank: '',
      no_rekening: '',
      nama_buku_tabungan: '',
      no_asuransi_bpjs: '',
      nilai_toefl: '',
      bivei_id: '',
      stawai_id: '',
      profesi_id: '',
      alamat: '',
      provinsi: '',
      kabkot: '',
      kecamatan: '',
      kelurahan: '',
      kodepos: '',
      domil_alamat: '',
      domil_provinsi: '',
      domil_kabkot: '',
      domil_kecamatan: '',
      domil_kelurahan: '',
      domil_kodepos: ''
    },
    api_wilayah: 'https://globalbudged.github.io/api-wilayah-indonesia/static/api',
    provinces: [],
    kotas: [],
    kecs: [],
    kels: [],
    domil_api_wilayah: 'https://globalbudged.github.io/api-wilayah-indonesia/static/api',
    domil_provinces: [],
    domil_kotas: [],
    domil_kecs: [],
    domil_kels: [],
    agamas: ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Budha', 'Konghucu', 'Lainnya'],
    bidang_surveis: [],
    status_kepegawaians: [],
    profesis: [],
    genders: [
      {
        id: 'L',
        name: 'Laki-Laki'
      },
      {
        id: 'P',
        name: 'Perempuan'
      }],
    loadingSelect: false,
    loading: false,
    edited: false,
    step: 1,
    cekbox: false,
    tab: 'biodatas'
  }),

  actions: {
    async getProvinces (id) {
      await axios.get(`${this.api_wilayah}/provinces.json`)
        .then((resp) => {
          console.log(resp)
          this.provinces = resp.data
          return resp.data.name
        }).catch(err => {
          console.log(err)
        })
    },
    async getKota (val) {
      this.loadingSelect = true
      if (this.provinces.length > 0) {
        console.log('jika data array provinsi ada')
        let temp = []
        temp = this.provinces.filter(v => v.name.toLowerCase() === val.toLowerCase())
        if (temp.length > 0) {
          const tempId = temp[0].id
          await axios.get(`${this.api_wilayah}/regencies/${tempId}.json`)
            .then((resp) => {
              console.log('resp', resp)
              this.kotas = resp.data
              console.log('kotas', this.kotas)
              this.loadingSelect = false
            }).catch(err => {
              console.log(err)
              this.loadingSelect = false
            })
        }
      }
      this.loadingSelect = false
    },
    async getKec (val) {
      this.loadingSelect = true
      if (this.kotas.length > 0) {
        console.log('jika data array provinsi ada')
        let temp = []
        temp = this.kotas.filter(v => v.name.toLowerCase() === val.toLowerCase())
        if (temp.length > 0) {
          const tempId = temp[0].id
          await axios.get(`${this.api_wilayah}/districts/${tempId}.json`)
            .then((resp) => {
              console.log('resp', resp)
              this.kecs = resp.data
              console.log('kec', this.kecs)
              this.loadingSelect = false
            }).catch(err => {
              console.log(err)
              this.loadingSelect = false
            })
        }
      }
      this.loadingSelect = false
    },
    async getKels (val) {
      this.loadingSelect = true
      if (this.kecs.length > 0) {
        let temp = []
        temp = this.kecs.filter(v => v.name.toLowerCase() === val.toLowerCase())
        if (temp.length > 0) {
          const tempId = temp[0].id
          await axios.get(`${this.api_wilayah}/villages/${tempId}.json`)
            .then((resp) => {
              console.log('resp', resp)
              this.kels = resp.data
              this.loadingSelect = false
              console.log('kec', this.kels)
            }).catch(err => {
              console.log(err)
              this.loadingSelect = false
            })
        }
      }
      this.loadingSelect = false
    },
    // domisil
    async domil_getProvinces (id) {
      await axios.get(`${this.domil_api_wilayah}/provinces.json`)
        .then((resp) => {
          console.log(resp)
          this.domil_provinces = resp.data
          return resp.data.name
        }).catch(err => {
          console.log(err)
        })
    },
    async domil_getKota (val) {
      this.loadingSelect = true
      if (this.domil_provinces.length > 0) {
        console.log('jika data array provinsi ada')
        let temp = []
        temp = this.domil_provinces.filter(v => v.name.toLowerCase() === val.toLowerCase())
        if (temp.length > 0) {
          const tempId = temp[0].id
          await axios.get(`${this.domil_api_wilayah}/regencies/${tempId}.json`)
            .then((resp) => {
              console.log('resp', resp)
              this.domil_kotas = resp.data
              console.log('kotas', this.domil_kotas)
              this.loadingSelect = false
            }).catch(err => {
              console.log(err)
              this.loadingSelect = false
            })
        }
      }
      this.loadingSelect = false
    },
    async domil_getKec (val) {
      this.loadingSelect = true
      if (this.domil_kotas.length > 0) {
        console.log('jika data array provinsi ada')
        let temp = []
        temp = this.domil_kotas.filter(v => v.name.toLowerCase() === val.toLowerCase())
        if (temp.length > 0) {
          const tempId = temp[0].id
          await axios.get(`${this.domil_api_wilayah}/districts/${tempId}.json`)
            .then((resp) => {
              console.log('resp', resp)
              this.domil_kecs = resp.data
              console.log('kec', this.kecs)
              this.loadingSelect = false
            }).catch(err => {
              console.log(err)
              this.loadingSelect = false
            })
        }
      }
      this.loadingSelect = false
    },
    async domil_getKels (val) {
      this.loadingSelect = true
      if (this.domil_kecs.length > 0) {
        let temp = []
        temp = this.domil_kecs.filter(v => v.name.toLowerCase() === val.toLowerCase())
        if (temp.length > 0) {
          const tempId = temp[0].id
          await axios.get(`${this.domil_api_wilayah}/villages/${tempId}.json`)
            .then((resp) => {
              console.log('resp', resp)
              this.domil_kels = resp.data
              this.loadingSelect = false
              console.log('kec', this.domil_kels)
            }).catch(err => {
              console.log(err)
              this.loadingSelect = false
            })
        }
      }
      this.loadingSelect = false
    },

    async getBidangSurvei() {
      await api.get('/v1/bidangsurvei/data')
        .then((resp) => {
          this.bidang_surveis = resp.data
        }).catch(err => {
          console.log(err)
        })
    },
    async getStatusKP() {
      await api.get('v1/statusKp/data')
        .then((resp) => {
          this.status_kepegawaians = resp.data
        }).catch(err => {
          console.log(err)
        })
    },
    async getProvesi() {
      await api.get('v1/provesi/data')
        .then((resp) => {
          this.profesis = resp.data
        }).catch(err => {
          console.log(err)
        })
    },

    setToday () {
      const date = new Date()
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + (date.getDate())).slice(-2)
      const formatDb = year + '-' + month + '-' + day
      this.form.tanggal_lahir = formatDb
    },
    setForm (name, val) {
      this.form[name] = val
    },
    setOpen() {
      this.isOpen = !this.isOpen
    },

    async konfirmasiData(data) {
      const id = data.id
      this.form = data
      this.loading = true
      try {
        await api.post(`/v1/surveyor/surveyoredit/${id}`, this.form).then(resp => {
          notifSuccess(resp)
          const table = useSurveyorTable()
          table.getDataTable()
          this.resetFORM()
          this.loading = false
        })
      } catch (error) {

      }
    },

    cekIdProfil(data) {
      if (data.surveyor !== null) {
        this.getSurveyor(data)
      } else {
        console.log('kosong', data)
      }
    },

    async getSurveyor(data) {
      const id = data.surveyor ? data.surveyor.id : data.id
      try {
        await api.get(`/v1/surveyor/surveyorme/${id}`).then(resp => {
          console.log('data me', resp.data.data)
          this.form = resp.data.data
          this.user = data.surveyor.id
        })
      } catch (error) {

      }
    },

    duplikatDataProfil() {
      if (this.edited === true && this.cekbox === true) {
        this.form.domil_alamat = this.form.alamat
        this.form.domil_provinsi = this.form.provinsi
        this.form.domil_kabkot = this.form.kabkot
        this.form.domil_kecamatan = this.form.kecamatan
        this.form.domil_kelurahan = this.form.kelurahan
        this.form.domil_kodepos = this.form.kodepos
        this.saveProfil(this.form)
      } else if (this.edited === true) {
        // console.log('form edit mloloh', this.form)
        this.saveProfil(this.form)
      } else {
        console.log('Tidak di perbolehkan')
      }
    },

    duplikatData() {
      if (this.cekbox === true) {
        this.form.domil_alamat = this.form.alamat
        this.form.domil_provinsi = this.form.provinsi
        this.form.domil_kabkot = this.form.kabkot
        this.form.domil_kecamatan = this.form.kecamatan
        this.form.domil_kelurahan = this.form.kelurahan
        this.form.domil_kodepos = this.form.kodepos
        this.saveForm(this.form)
      } else {
        this.saveForm(this.form)
      }
    },

    // simpan verifikasi surveyor
    async saveForm(data) {
      const id = this.user
      console.log('id', this.user)
      this.loading = true
      try {
        const resp = await api.post(`/v1/surveyor/updatefull/${id}`, data)
        console.log('save data', resp)
        notifSuccess(resp)
        // ini untuk panggil data table
        const table = useSurveyorTable()
        table.getDataTable()
        routerInstance.push('/')
        this.resetFORM()
        this.loading = false
        return new Promise((resolve) => {
          resolve(resp)
        })
      } catch (error) {
        this.step = 1
        this.loading = false
      }
    },

    // simpan edit table surveyor
    async saveFormTable() {
      this.loading = true
      try {
        const resp = await api.post('/v1/surveyor/store', this.form)
        notifSuccess(resp)
        this.setOpen()
        const table = useSurveyorTable()
        table.getDataTable()
        this.resetFORM()
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },

    async saveProfil(data) {
      const id = this.user
      console.log('id', this.user)
      this.loading = true
      try {
        const resp = await api.post(`/v1/surveyor/updatefull/${id}`, data)
        console.log('save data', resp)
        notifSuccess(resp)
        // ini untuk panggil data table
        const table = useSurveyorTable()
        table.getDataTable()
        routerInstance.push('/profile')

        this.edited = false
        this.loading = false
        return new Promise((resolve) => {
          resolve(resp)
        })
      } catch (error) {
        this.edited = true
        this.loading = false
      }
    },
    resetFORM () {
      this.form = {}
      const columns = [
        'id', 'nama_lengkap', 'email', 'nik', 'user_id', 'photo', 'tempat_lahir', 'tanggal_lahir',
        'gender', 'agama', 'no_hp1', 'no_hp2',
        'nama_npwp', 'nama_bank', 'no_rekening',
        'nama_buku_tabungan', 'no_asuransi_bpjs', 'nilai_toefl', 'bivei_id', 'stawai_id',
        'profesi_id', 'alamat', 'provinsi', 'kabkot', 'kecamatan', 'kelurahan', 'kodepos', 'domil_alamat', 'domil_provinsi',
        'domil_kabkot', 'domil_kecamatan', 'domil_kelurahan', 'domil_kodepos']
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], '')
      }
      this.setToday()
      this.setForm('gender', 'L')
      this.setForm('agama', 'Islam')
      this.user = null
    },
    newData () {
      this.resetFORM()
      this.edited = false
      this.isOpen = !this.isOpen
    },
    editData(val) {
      console.log('datanya edit', val)
      this.edited = true
      const keys = Object.keys(val)
      keys.forEach((key, index) => {
        this.setForm(key, val[key])
      })
      // kecuali yang ada di object user
      this.isOpen = !this.isOpen
    }

  }
})

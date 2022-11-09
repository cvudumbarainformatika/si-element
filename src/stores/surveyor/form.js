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
      bidang_survei: '',
      status_kepegawaian: '',
      profesi: '',
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
    bidang_surveis: ['admen', 'UKM', 'UKP'],
    status_kepegawaians: ['ASN', 'SWASTA', 'Purna Tugas'],
    profesis: ['Dokter', 'Dokter Gigi', 'SKM', 'Bidan', 'Perawat', 'Lainnya'],
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
    cekbox: false
  }),

  getters: {

  },

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

    async getSurveyor(data) {
      const id = data.surveyor.id
      try {
        await api.get(`/v1/surveyor/surveyorme/${id}`).then(resp => {
          console.log('data me', resp.data.data)
          this.form = resp.data.data
          this.user = data.surveyor.id
        })
      } catch (error) {

      }
    },

    duplikatData() {
      if (this.cekbox === true) {
        const formDuplikat = {
          nik: this.form.nik,
          nama_lengkap: this.form.nama_lengkap,
          email: this.form.email,
          tempat_lahir: this.form.tempat_lahir,
          tanggal_lahir: this.form.tanggal_lahir,
          gender: this.form.gender,
          agama: this.form.agama,
          no_hp1: this.form.no_hp1,
          no_hp2: this.form.no_hp2,
          nama_npwp: this.form.nama_npwp,
          nama_bank: this.form.nama_bank,
          no_rekening: this.form.no_rekening,
          nama_buku_tabungan: this.form.nama_buku_tabungan,
          no_asuransi_bpjs: this.form.no_asuransi_bpjs,
          nilai_toefl: this.form.nilai_toefl,
          bidang_survei: this.form.bidang_survei,
          status_kepegawaian: this.form.status_kepegawaian,
          profesi: this.form.profesi,
          alamat: this.form.alamat,
          provinsi: this.form.provinsi,
          kabkot: this.form.kabkot,
          kecamatan: this.form.kecamatan,
          kelurahan: this.form.kelurahan,
          kodepos: this.form.kodepos,
          domil_alamat: this.form.alamat,
          domil_provinsi: this.form.provinsi,
          domil_kabkot: this.form.kabkot,
          domil_kecamatan: this.form.kecamatan,
          domil_kelurahan: this.form.kelurahan,
          domil_kodepos: this.form.kodepos,
          password_baru: this.form.password_baru,
          password_baru_confirmation: this.form.password_baru_confirmation
        }
        this.saveForm(formDuplikat)
      } else {
        this.saveForm(this.form)
      }
    },

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
    resetFORM () {
      this.form = {}
      const columns = [
        'id', 'user_id', 'tempat_lahir', 'tanggal_lahir',
        'gender', 'agama', 'no_hp1', 'no_hp2',
        'nama_npwp', 'nama_bank', 'no_rekening',
        'nama_buku_tabungan', 'no_asuransi_bpjs', 'nilai_toefl', 'bidang_survei', 'status_kepegawaian',
        'profesi', 'alamat', 'provinsi', 'kabkot', 'kecamatan', 'kelurahan', 'kodepos', 'domil_alamat', 'domil_provinsi',
        'domil_kabkot', 'domil_kecamatan', 'domil_kelurahan', 'domil_kodepos', 'status', 'nama_lengkap', 'email', 'nik']
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
      console.log('datanya', val)
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

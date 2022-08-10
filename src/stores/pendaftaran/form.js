import { defineStore } from 'pinia'
import { countries } from 'src/modules/countries'
import { dateDbFormat } from 'src/modules/formatter'

export const useFormPendaftaranStore = defineStore('formPendaftaran', {
  state: () => ({
    form: {
      nik: '',
      noka: '',
      no_rm: '', //
      no_hp: '', //
      nama: '',
      kewarganegaraan: 'WNI',
      negara: 'Indonesia',
      alamat: '',
      provinsi: '',
      kabkot: '',
      kecamatan: '',
      kelurahan: '',
      kodepos: '',
      rt: '',
      rw: '',
      tempat_lahir: '',
      tanggal_lahir: '',
      gender: 'L',
      agama: 'Islam',
      masa: '',
      status_pernikahan: '',
      pendidikan: '',
      suku: 'JAWA',
      sapaan: '',
      cara_datang: 'SENDIRI'
    },
    source: {
      kewarganegaraans: ['WNI', 'WNA'],
      negaras: countries,
      provinces: [],
      kabkots: [],
      kecamatans: [],
      kelurahans: [],
      agama: ['Islam', 'Protestan', 'Katolik', 'Hindu', 'Budha', 'Konghucu'],
      masas: [
        { id: 1, nama: 'BALITA', rentang_umur_minim: 0, rentang_umur_max: 4 },
        { id: 2, nama: 'ANAK', rentang_umur_minim: 5, rentang_umur_max: 12 },
        { id: 3, nama: 'REMAJA', rentang_umur_minim: 13, rentang_umur_max: 24 },
        { id: 4, nama: 'DEWASA', rentang_umur_minim: 25, rentang_umur_max: 55 },
        { id: 5, nama: 'LANSIA', rentang_umur_minim: 56, rentang_umur_max: 200 }
      ],
      status_pernikahans: ['SUDAH MENIKAH', 'BELUM MENIKAH', 'DUDA', 'LAJANG', 'JANDA'],
      sukus: ['JAWA', 'MADURA', 'MINANGKABAO', 'BATAK', 'NIAS', 'MELAYU', 'SASAK', 'DAYAK', 'BUGIS', 'LAINNYA'],
      cara_datangs: ['DIANTAR', 'SENDIRI']
    }
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
  },
  actions: {
    setToday () {
      const date = new Date()
      this.form.tanggal_lahir = dateDbFormat(date)
    }
  }
})

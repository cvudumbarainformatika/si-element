
const routes = [
  {
    path: '/',
    component: () => import('layouts/Admin/AdminLayout.vue'),
    meta: { requireAuth: true },
    children: [
      { path: '', redirect: '/dashboard' },
      { path: '/dashboard', name: 'dashboard', component: () => import('pages/IndexPage.vue') },
      { path: '/surveyor', name: 'surveyor', component: () => import('pages/v1/surveyor/IndexPage.vue') },
      { path: '/master', name: 'master', component: () => import('pages/v1/master/IndexPage.vue') },
      { path: '/user', name: 'user', component: () => import('pages/v1/user/IndexPage.vue') },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('pages/v1/setting/IndexPage.vue'),
        children: [
          { path: '/setting', redirect: '/setting/info' },
          { path: '/setting/info', name: 'setting.info', component: () => import('pages/v1/setting/info/InfoPage.vue') },
          { path: '/setting/themes', name: 'setting.themes', component: () => import('pages/v1/setting/theme/ThemesPage.vue') }
        ]
      },
      { path: '/profile', name: 'profile', component: () => import('pages/v1/profile/IndexPage.vue') }
    ]
  },

  // login
  {
    path: '/login',
    component: () => import('layouts/Auth/AuthLayout.vue'),
    meta: { requireAuth: false },
    children: [
      { path: '', component: () => import('pages/auth/AuthPage.vue') }
    ]
  },
  {
    path: '/registrasi',
    component: () => import('layouts/Auth/AuthLayout.vue'),
    meta: { requireAuth: false },
    children: [
      { path: '', component: () => import('pages/v1/surveyor/prasurveyor/IndexPage.vue') }
    ]
  },
  {
    path: '/notifregistrasi',
    component: () => import('layouts/Auth/AuthLayout.vue'),
    meta: { requireAuth: false },
    children: [
      { path: '', component: () => import('pages/v1/surveyor/prasurveyor/NotifRegister.vue') }
    ]
  },
  {
    path: '/veriregister',
    component: () => import('layouts/Auth/AuthLayout.vue'),
    meta: { requireAuth: true },
    children: [
      { path: '', component: () => import('pages/v1/surveyor/prasurveyor/VeriRegister.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

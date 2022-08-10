
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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue')
    },
    {
      path: '/',
      component: () => import('@/views/home/HomePage.vue'),
      redirect: '/home/welcome',
      children: [
        {
          path: '/home/welcome',
          component: () => import('@/views/home/WelcomePage.vue')
        },
        {
          path: '/categories',
          component: () => import('@/views/goods/CatePage.vue')
        },
        {
          path: '/goods',
          component: () => import('@/views/goods/ListPage.vue')
        },
        {
          path: '/params',
          component: () => import('@/views/goods/ParamsPage.vue')
        },
        {
          path: '/orders',
          component: () => import('@/views/order/OrderPage.vue')
        },
        {
          path: '/rights',
          component: () => import('@/views/power/RightsPage.vue')
        },
        {
          path: '/roles',
          component: () => import('@/views/power/RolesPage.vue')
        },
        {
          path: '/reports',
          component: () => import('@/views/report/ReportPage.vue')
        },
        {
          path: '/users',
          component: () => import('@/views/user/UserPage.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login') return '/login'
})

export default router

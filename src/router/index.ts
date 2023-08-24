import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

interface CustomImportMeta extends ImportMeta {
  env: any
}

const router = createRouter({
  history: createWebHistory((import.meta as CustomImportMeta).env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
})

export default router

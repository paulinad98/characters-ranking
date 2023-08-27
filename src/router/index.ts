import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { loadImage } from '@/helpers/loadImage'
import charactersData from '@/assets/characters.json'

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
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('@/views/GameView.vue'),
      beforeEnter() {
        const imagesArray = charactersData.ranczo.map((character) => character.img)
        loadImage(imagesArray)
      }
    }
  ]
})

export default router

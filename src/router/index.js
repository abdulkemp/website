import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
  { path: '/services', name: 'services' },
  { path: '/work', name: 'work' },
  { path: '/process', name: 'process' },
  { path: '/contact', name: 'contact' },
  { path: '/review', name: 'review' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

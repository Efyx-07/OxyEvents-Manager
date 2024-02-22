import { createRouter, createWebHistory } from 'vue-router';

//dashboard views
import LoginPage from '@/views/dashboard-views/LoginPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    // dashboard routes
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },

    // public routes
  ]
})

export default router

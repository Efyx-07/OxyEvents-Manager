import { createRouter, createWebHistory } from 'vue-router';

//dashboard views
import LoginPage from '@/views/dashboard-views/LoginPage.vue';
import HomePage from '@/views/dashboard-views/HomePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    // dashboard routes
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage
    },

    // public routes
  ]
})

export default router

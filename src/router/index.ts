import { createRouter, createWebHistory } from 'vue-router';

//dashboard views
import LoginPage from '@/views/dashboard-views/LoginPage.vue';
import ResetPassword from '@/views/dashboard-views/ResetPassword.vue';
import HomePage from '@/views/dashboard-views/HomePage.vue';
import AdminUpdate from '@/views/dashboard-views/AdminUpdate.vue';
import AdminAdd from '@/views/dashboard-views/AdminAdd.vue';
import AdminDelete from '@/views/dashboard-views/AdminDelete.vue';

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
      path: '/reset-password/:token',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/admin-update',
      name: 'AdminUpdate',
      component: AdminUpdate
    },
    {
      path: '/admin-add',
      name: 'AdminAdd',
      component: AdminAdd
    },
    {
      path: '/admin-delete',
      name: 'AdminDelete',
      component: AdminDelete
    },

    // public routes
  ]
})

export default router

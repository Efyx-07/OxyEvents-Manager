import { createRouter, createWebHistory } from 'vue-router';

//dashboard views
import LoginPage from '@/views/dashboard-views/LoginPage.vue';
import ResetPassword from '@/views/dashboard-views/ResetPassword.vue';
import AdminRegister from '@/views/dashboard-views/AdminRegister.vue';
import HomePage from '@/views/dashboard-views/HomePage.vue';
import AdminUpdate from '@/views/dashboard-views/AdminUpdate.vue';
import AdminAdd from '@/views/dashboard-views/AdminAdd.vue';
import AdminDelete from '@/views/dashboard-views/AdminDelete.vue';
import EventCreate from '@/views/dashboard-views/EventCreate.vue';
import EventUpdate from '@/views/dashboard-views/EventUpdate.vue';
import EventParticipants from '@/views/dashboard-views/EventParticipants.vue';

//confirmation pages
import ConfirmPagePublication from '@/views/dashboard-views/ConfirmPagePublication.vue';

//public views
import EventPage from '@/views/public-views/EventPage.vue';

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
      path: '/admin_register/:token',
      name: 'AdminRegister',
      component: AdminRegister
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
    {
      path: '/event-create',
      name: 'EventCreate',
      component: EventCreate
    },
    {
      path: '/event-update/:eventSlug',
      name: 'EventToUpdate',
      component: EventUpdate
    },
    {
      path: '/event-participants/:eventSlug',
      name: 'EventParticipants',
      component: EventParticipants
    },


    // confirmation pages
    {
      path: '/publication-confirmation',
      name: 'ConfirmPagePublication',
      component: ConfirmPagePublication
    },

    // public routes
    {
      path: '/event-page',
      name: 'EventPage',
      component: EventPage
    },
      // création d'une route dynamique pour afficher la page de l'evenement
      {
        path: '/event-page/:eventSlug', 
        name: 'EventDetail',
        component: EventPage
      },
  ]
});

//permet à chaque changement de route d'afficher la nouvelle page à partir du haut
router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router

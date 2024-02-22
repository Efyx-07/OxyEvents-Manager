import './assets/sass/main.scss'
import { createApp } from 'vue';
import { createPinia } from 'pinia';
//import { useEventStore } from './stores/EventStore';
import { useAdminStore } from './stores/AdminStore';
import CKEditor from '@ckeditor/ckeditor5-vue';
import App from './App.vue';
import router from './router';

// initialise l'appli à la fin du chargement des données
const initApp = async () => {

    const app = createApp(App);
    
    // initialise Pinia
    app.use(createPinia());
    
    // crée une instance de store
    //const eventStore = useEventStore();
    const adminStore = useAdminStore();

    // verifie si un token est dans le localStorage
    const token = localStorage.getItem('token');

    // si le token est présent conserve la valeur true après rafraichissement de l'app
    if (token) {
        adminStore.isConnected = true;
    }

    try {
        //await eventStore.loadEventsData();
        await adminStore.loadAdminsData();
        
    } catch (error) {
        console.error('Erreur lors du chargement des données: ', error);
    };

    app.use(CKEditor);
    app.use(router);
    app.mount('#app');
}; 

initApp();

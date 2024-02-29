import { defineStore } from 'pinia';

export const useGlobalDataStore = defineStore('globalData', {

    state: () => ({

        // Serveur backend
        hostName: 'https://oxyeventsmanagerdemo-backend.vercel.app', // adresse du serveur backend 

        // Icones de Iconify
        validateIconName: "ooui:success", // Icone 'validé'
        removeImageIconName: "grommet-icons:update", // Icone 'changer image'
   
    }),
});
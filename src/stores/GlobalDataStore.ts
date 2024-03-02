import { defineStore } from 'pinia';

type State = {
    hostName: string;
    validateIconName: string;
    removeImageIconName: string;
    dataLoaderDelay: number;
}

export const useGlobalDataStore = defineStore('globalData', {

    state: (): State => ({

        // Serveur backend
        hostName: 'https://oxyeventsmanagerdemo-backend.vercel.app', // adresse du serveur backend 

        // Icones de Iconify
        validateIconName: "ooui:success", // Icone 'validé'
        removeImageIconName: "grommet-icons:update", // Icone 'changer image'

        // Délai du DataLoader en tant que transition
        dataLoaderDelay: 500,
   
    }),
});
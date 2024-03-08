import { defineStore } from 'pinia';
import type { ImportMetaEnv } from 'env';

const hostName: ImportMetaEnv = import.meta.env.VITE_BACKEND_URL;

type State = {
    hostName: ImportMetaEnv;
    validateIconName: string;
    removeImageIconName: string;
    dataLoaderDelay: number;
}

export const useGlobalDataStore = defineStore('globalData', {

    state: (): State => ({

        // Serveur backend
        hostName: hostName, // adresse du serveur backend 

        // Icones de Iconify
        validateIconName: "ooui:success", // Icone 'validé'
        removeImageIconName: "grommet-icons:update", // Icone 'changer image'

        // Délai du DataLoader en tant que transition
        dataLoaderDelay: 500,
   
    }),
});
// import interface
import type { Admin, AdminApiResponse } from '@/types/adminsTypes';
import type { ImportMetaEnv } from 'env';

const hostName: ImportMetaEnv = import.meta.env.VITE_BACKEND_URL; // adresse du serveur backend 

// récupère du backend, l'API des datas des administrateurs
export async function fetchAdminsData(): Promise<Admin[]> {

    try {

        const response = await fetch (`${hostName}/admins`);
        if (!response.ok) {
            throw new Error ('Erreur lors de la récupération des données des administrateurs');
        }
        const adminsData: AdminApiResponse = await response.json();
        return adminsData.admins;

    } catch (error) {
        console.error('Erreur lors de la récupération des données des administrateurs: ', error);
        throw error
    }
};
// import des interfaces
import type { Event } from '@/types/eventsTypes';
import type { Participant } from '@/types/participantsTypes';
import type { Admin, AdminApiResponse } from '@/types/adminsTypes';

const hostName = 'https://oxyeventsmanagerdemo-backend.vercel.app'; // adresse du serveur backend

// récupère du backend, l'API des datas des évènements
export async function fetchEventsData(): Promise<Event[]> {

    try {

        const response = await fetch (`${hostName}/events`);
        if (!response.ok) {
            throw new Error ('Erreur lors de la récupération des données de l\'évènement');
        }
        const eventsData: Event[] = await response.json();
        return eventsData;

    } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'évènement: ', error);
        throw error
    }
};

// récupère du backend, l'API des datas des particpants pour un évènement sélectionné
export async function fetchParticipantsData(eventSlug: string): Promise<Participant[]> {

    try {

        const response = await fetch (`${hostName}/users/${eventSlug}/participants`);
        if(!response.ok) {
            throw new Error('Erreur lors de la récupération des données des participants');
        }
        const participantsData: Participant[] = await response.json();
        return participantsData;

    } catch (error) {
        console.error('Erreur lors de la récupération des données des participants :', error);
        throw error;
    }
}; 

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
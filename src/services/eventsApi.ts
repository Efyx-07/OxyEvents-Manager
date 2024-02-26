// import interface
import type { Event } from '@/types/eventsTypes';

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
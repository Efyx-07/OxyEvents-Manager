// import interface
import type { Event, EventApiResponse } from '@/types/eventsTypes';

const hostName = 'http://localhost:3000'; // adresse du serveur backend 

// récupère du backend, l'API des datas des évènements
export async function fetchEventsData(): Promise<Event[]> {

    try {

        const response = await fetch (`${hostName}/events`);
        if (!response.ok) {
            throw new Error ('Erreur lors de la récupération des données de l\'évènement');
        }
        const eventsData: EventApiResponse = await response.json();
        return eventsData.events;

    } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'évènement: ', error);
        throw error
    }
};
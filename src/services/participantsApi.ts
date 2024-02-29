// import interface
import type { Participant } from '@/types/participantsTypes';

const hostName = 'https://oxyeventsmanagerdemo-backend.vercel.app'; // adresse du serveur backend 

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
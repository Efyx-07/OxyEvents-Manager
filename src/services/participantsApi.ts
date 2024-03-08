// import interface
import type { Participant, ParticipantApiResponse } from '@/types/participantsTypes';
import type { ImportMetaEnv } from 'env';

const hostName: ImportMetaEnv = import.meta.env.VITE_BACKEND_URL; // adresse du serveur backend 

// récupère du backend, l'API des datas des particpants pour un évènement sélectionné
export async function fetchParticipantsData(eventSlug: string): Promise<Participant[]> {

    try {

        const response = await fetch (`${hostName}/users/${eventSlug}/participants`);
        if(!response.ok) {
            throw new Error('Erreur lors de la récupération des données des participants');
        }
        const participantsData: ParticipantApiResponse = await response.json();
        return participantsData.participants;

    } catch (error) {
        console.error('Erreur lors de la récupération des données des participants :', error);
        throw error;
    }
}; 
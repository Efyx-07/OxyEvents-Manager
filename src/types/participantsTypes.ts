export interface Participant {
    id: number;
    nom_entreprise: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
}

export interface ParticipantApiResponse {
    participants: Participant[];
}
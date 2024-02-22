export interface Admin {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    hashed_password: string;
    statut: 'SUPERADMIN' | 'ADMIN' | 'GENERIC' | 'GUEST';
}
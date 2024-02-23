export interface Admin {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    hashed_password: string;
    statut: 'SUPERADMIN' | 'ADMIN' | 'GENERIC' | 'GUEST';
}

export interface AdminData {
    id: number;
    lastName: string;
    firstName: string;
    email: string;
    status: 'SUPERADMIN' | 'ADMIN' | 'GENERIC' | 'GUEST';
}
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import * as api from '@/services/api'; // importe les fonctions de l'api du fichier api.js
import type { Admin, AdminData } from '@/types/adminsTypes';

type State = {
    token: string | null;
    isConnected: boolean;
    adminData: AdminData;
    admins: Admin[];
}

export const useAdminStore = defineStore('admins', {

    state: (): State => ({
        token: null, // initialise le token à null par défaut
        isConnected: false, // statut initial de l'administrateur à 'non-connecté'
        adminData: reactive<AdminData>({id: 0, lastName:'', firstName: '', email:'', status: 'GUEST',}), // déclare adminData comme réactif
        admins: [], // initialise admins comme un tableau vide
    }),

    actions: {

        // stocke le token obtenu à la connexion de l'administrateur
        setToken(newToken: string | null) {
            this.token = newToken;
        },

        // supprime le token à la déconnexion de l'administrateur
        clearToken() {
            this.token = null;
        },

        // sauvegarde les données de l'administrateur connecté dans le localStorage
        saveAdminDataInLocalStorage(): void {
            localStorage.setItem('adminData', JSON.stringify(this.adminData));
        },

        // charge les données de l'administrateur à partir de la réponse JSON
        setAdminData(adminData: AdminData): void {
            this.adminData = reactive(adminData);
            this.saveAdminDataInLocalStorage();
        },

        // charge les données de l'administrateur à partir du localStorage
        async loadAdminDataFromLocalStorage() {
            const localStorageAdminData = localStorage.getItem('adminData');
            if (localStorageAdminData) {
                this.adminData = JSON.parse(localStorageAdminData);
            }
        },

        // récupère les données de tous les administrateurs à partir de api.js
        async loadAdminsData() {
            try {
                const adminsData: Admin[] = await api.fetchAdminsData();
                this.admins = adminsData;

            } catch (error) {
                console.error('Erreur lors du chargement des données des administrateurs');
            }
        },

        // ajoute administrateur nouvellement créé à admins
        addToAdmins(admin: Admin) {
            this.admins.push(admin);
        },
    },

    getters: {

        // méthode pour filtrer les administrateurs en comparant avec l'id de l'administrateur actuellement connecté (admin connecté ne peut pas supprimer son propre compte)
        filteredAdmins(): Admin[] {
            const connectedAdminId: number = this.adminData.id;
            return this.admins.filter(admin => admin.id !== connectedAdminId);
        }
    }
});
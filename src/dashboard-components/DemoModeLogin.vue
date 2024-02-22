<script setup lang="ts">

import ReusablePrimaryButton from '@/sub-components/ReusablePrimaryButton.vue';
import { useGlobalDataStore } from '@/stores/GlobalDataStore';
import { useRouter } from 'vue-router';
import { useAdminStore } from '@/stores/AdminStore';

const router = useRouter();
const adminStore = useAdminStore();

// envoie la requête
const connectGuestAndLaunchDemo = async () => {

    try {

        const { hostName } = useGlobalDataStore();

        const response = await fetch(`${hostName}/guest/login`, {
            method: 'POST'
        });

        if (response.ok) {

            // récupère les données de l'administrateur depuis la réponse du serveur et affiche le message de connexion réussie
            const data = await response.json();
            console.log(data.message);
            adminStore.setAdminData(data.admin);

            // si connexion réussie, obtient le token du serveur et le stocke dans le localStorage 
            const token = data.token;
            localStorage.setItem('token', token);

            // stocke également le token dans AdminStore
            adminStore.setToken(token);
            adminStore.isConnected = true; // passe le statut de l'administrateur sur 'connecté'

            // connexion réussie, redirection vers page d'accueil du back-office
            router.push('/home');
        
        } else {
            // affiche une erreur et empêche la redirection
            console.error('Erreur lors de la connexion: ', response.statusText);
        } 

    } catch (error) {
        // affiche une erreur en cas d'echec de la requete
        console.error('Erreur lors de la connexion: ', error);
    }
};

</script>

<template>
    <p>🚀 Bienvenue en mode démo !</p>
    <p> Veuillez noter que certaines fonctionnalités ont été désactivées dans ce mode pour des raisons de démonstration.</p>
    <p>Bonne exploration !</p>
    <ReusablePrimaryButton class="adminLoginPage-button" type="submit" @click="connectGuestAndLaunchDemo">Explorer</ReusablePrimaryButton>
</template>

<style lang="scss" scoped>

p {
    margin: 0;
    font-size: .9rem;
    font-weight: 400;
}
.adminLoginPage-button {
    align-self: self-end;
    cursor: pointer;
}

</style>
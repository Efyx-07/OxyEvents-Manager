<script setup lang="ts">

import ReusablePrimaryButton from '@/sub-components/ReusablePrimaryButton.vue';
import ButtonLoader from '@/sub-components/ButtonLoader.vue';
import { ref } from 'vue';
import { useGlobalDataStore } from '@/stores/GlobalDataStore';
import { useRouter } from 'vue-router';
import { useAdminStore } from '@/stores/AdminStore';
import { Icon } from '@iconify/vue';

const router = useRouter();
const adminStore = useAdminStore();

// visibilité par défaut du message d'erreur
const wrongIds = ref<boolean>(false);

// visibilité par défaut du loader
const isLoading = ref<boolean>(false);

// propriétés du formulaire
const email = ref<string>('');
const password = ref<string>('');

// valide le formulaire
const handleAdminLogin = async (): Promise<void> => {

    // extrait les valeurs des objets ref
    const emailValue = email.value;
    const passwordValue = password.value;

    try {

        isLoading.value = true;

        const { hostName } = useGlobalDataStore();

        const response = await fetch(`${hostName}/admins/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue,
            }),
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
            wrongIds.value = true;
            // Réinitialise wrongIds après 3 secondes
            setTimeout(() => {
                wrongIds.value = false;
                resetForm();
            }, 3000);

        }

    } catch (error) {
        // affiche une erreur en cas d'echec de la requete
        console.error('Erreur lors de la connexion: ', error);
    }
};

// réinitialise le formulaire
const resetForm = () => {
    email.value = '';
    password.value = '';
    isLoading.value = false;
}

</script>

<template>
    <form class="adminLoginPage-form" @submit.prevent="handleAdminLogin">
        <div class="inputs_wrapper">
            <div class="input_container">
                <label for="email">Email</label>
                <input type="email" name="email" id="adminLogin_email" v-model="email">
            </div>
            <div class="input_container">
                <label for="mot_de_passe">Mot de passe</label>
                <input type="password" name="adminPassword" id="adminLogin_password" v-model="password">
            </div>
        </div>

        <div class="registration-result_message" v-if="wrongIds">
            <div class="text_container">
                <Icon icon="mdi:alert-outline" class="alertIcon"/>
                <p>Identifiants invalides !</p>
            </div>
        </div>
        <div v-else class="adminLoginPage-button">
            <ButtonLoader v-if="isLoading"/>
            <ReusablePrimaryButton type="submit" v-else>Se connecter</ReusablePrimaryButton>
        </div>
    </form>  
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/authFormStyle.scss';

</style>
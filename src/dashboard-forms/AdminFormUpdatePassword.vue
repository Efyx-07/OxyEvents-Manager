<script setup lang="ts">

import { ref } from 'vue';
import { useGlobalDataStore } from '@/stores/GlobalDataStore';
import { Icon } from '@iconify/vue';
import { useAdminStore } from '@/stores/AdminStore';
import { useRouter } from 'vue-router';
import ReusablePrimaryButton from '@/sub-components/ReusablePrimaryButton.vue';

// visibilité par défaut des messages de succés ou d'erreur
const successMessage = ref(false);
const updateErrorMessage = ref(false)

// propriétés du formulaire
const adminCurrentPassword = ref('');
const adminNewPassword = ref('');
const confirmAdminNewPassword = ref('');

// états de validation
const adminNewPasswordValid = ref(true);
const confirmAdminNewPasswordValid = ref(true);

// Regex
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!*]).{8,}$/;

// fonctions de validation des champs
const validateAdminNewPassword = () => {
    adminNewPasswordValid.value = passwordRegex.test(adminNewPassword.value);
    console.log('Validation du nouveau mot de passe :', adminNewPasswordValid.value);
};
const validateConfirmAdminNewPassword = () => {
    confirmAdminNewPasswordValid.value = adminNewPassword.value === confirmAdminNewPassword.value;
    console.log('Validation de la confirmation du nouveau mot de passe :', confirmAdminNewPasswordValid.value);
};

// valide le formulaire
const validateAdminPasswordUpdating = async () => {
    console.log('Soumission du formulaire');

    // valide les champs individuels
    validateAdminNewPassword();
    validateConfirmAdminNewPassword();

    // extrait les valeurs des objets ref
    const adminCurrentPasswordValue = adminCurrentPassword.value;
    const adminNewPasswordValue = adminNewPassword.value;

    // détermine les chapms requis pour soumettre le formulaire
    const requiredFieldsValid = 
        adminNewPasswordValid.value &&
        confirmAdminNewPasswordValid.value;

    // soumet le formulaire avec les champs requis
    if(requiredFieldsValid) {

        try {

            // obtient le token du localStorage
            const token = localStorage.getItem('token'); 

            if(!token) {
                console.error('Token introuvable dans le localStorage');
                return;
            }

            // décode le token pour obtenir adminId
            const tokenParts = token.split('.');
            // décode la partie payload
            const tokenPayload = JSON.parse(atob(tokenParts[1]));
            // extrait adminId du payload
            const adminIdValue = tokenPayload.adminId;

            const { hostName } = useGlobalDataStore();

            const response = await fetch (`${hostName}/admins/updatePassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // utilise le token dans l'en-tête de la requête
                },
                body: JSON.stringify({
                    adminId: adminIdValue,
                    adminCurrentPassword: adminCurrentPasswordValue,
                    adminNewPassword: adminNewPasswordValue,

                }),
            });

            if (response.ok) {

                // mise à jour du mot de passe réussie
                const data = await response.json();
                console.log(data.message);

                successMessage.value = true;

            } else {
                // affiche un message d'erreur à l'utilisateur
                console.error('Erreur lors de la modification du mot de passe', response.statusText)
                updateErrorMessage.value = true;
            }
        } catch (error) {
            console.error('Erreur lors de la modification du mot de passe: ', error);
        }
    }
}

// modification valdé, fonction pour deconnecter la session en cours et rediriger vers la page de connexion
const adminStore = useAdminStore();
const router = useRouter();

const disconnectToReconnect = () => {

    // supprime le token du localStorage
    localStorage.removeItem('token');
    // supprime les données administrateur du localStorage
    localStorage.removeItem('adminData');
    // réinitialise le store
    adminStore.clearToken();
    // passe le statut de l'administrateur sur 'déconnecté'
    adminStore.isConnected = false;

    // redirige vers la page de connexion
    router.push('/');
}

// fonction qui efface le message et réinitialise tous les champs
const resetForm = () => {
    updateErrorMessage.value = false;
    adminCurrentPassword.value = '';
    adminNewPassword.value = '';
    confirmAdminNewPassword.value = '';
};

</script>

<template>
    <div class="registration-result_message" v-if="successMessage">
        <div class="text_container">
            <Icon icon="ooui:success" class="successIcon"/>
            <p>Mot de passe modifié avec succés !</p>
        </div>
        <ReusablePrimaryButton @click="disconnectToReconnect">Connexion</ReusablePrimaryButton>
    </div>
    <div class="registration-result_message" v-else-if="updateErrorMessage">
        <div class="text_container">
            <Icon icon="mdi:alert-outline" class="alertIcon"/>
            <p>Erreur lors de la mise à jour du mot de passe !</p>
        </div>
        <ReusablePrimaryButton @click="resetForm">Compris</ReusablePrimaryButton>
    </div>
    <form class="adminMgmtForm" @submit.prevent="validateAdminPasswordUpdating" v-else>
        <div class="fields_wrapper">
            <div class="field_container">
                <label for="mot_de_passe_actuel">Votre mot de passe actuel</label>
                <input type="password" name="adminCurrentPassword" id="adminCurrentPassword" v-model="adminCurrentPassword">
            </div>
            <div class="field_container">
                <div class="label_container">
                    <label for="nouveau_mot_de_passe">Votre nouveau mot de passe</label>
                    <p class="password-instruction">
                        (doit contenir au moins 8 caractères dont: 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial)
                    </p>
                </div>
                <div class="input_container">
                    <input type="password" name="adminNewPassword" id="adminNewPassword" v-model="adminNewPassword" @input="validateAdminNewPassword">
                    <Icon v-if="adminNewPasswordValid && adminNewPassword !== ''"  icon="ooui:success" class="validateIcon"/>
                </div>
                <p v-if="!adminNewPasswordValid && adminNewPassword !== ''" class="error-message">Merci d'entrer un nouveau mot de passe conforme</p>
            </div>
            <div class="field_container">
                <label for="confirmer_nouveau_mot_de_passe">Confirmez votre nouveau mot de passe</label>
                <div class="input_container">
                    <input type="password" name="confirmAdminNewPassword" id="confirmAdminNewPassword" v-model="confirmAdminNewPassword" @input="validateConfirmAdminNewPassword">
                    <Icon v-if="confirmAdminNewPasswordValid && confirmAdminNewPassword !== ''"  icon="ooui:success" class="validateIcon"/>
                </div>
                <p v-if="!confirmAdminNewPasswordValid && confirmAdminNewPassword !== ''" class="error-message">N'est pas identique à votre nouveau mot de passe</p>
            </div>
        </div>
        <ReusablePrimaryButton class="adminMgmtForm-button" type="submit">Modifier mot de passe</ReusablePrimaryButton>
    </form>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/adminMgmtFormStyle.scss';
</style>
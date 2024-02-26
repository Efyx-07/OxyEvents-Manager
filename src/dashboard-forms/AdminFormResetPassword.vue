<script setup lang="ts">

import ReusablePrimaryButton from '@/sub-components/ReusablePrimaryButton.vue';
import ButtonLoader from '@/sub-components/ButtonLoader.vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGlobalDataStore } from '@/stores/GlobalDataStore';
import { Icon } from '@iconify/vue';

// statut de visibilité par défaut des messages d'erreur et de succès
const errorMessage = ref<boolean>(false);
const successMessage = ref<boolean>(false);

// visibilité par défaut du loader
const isLoading = ref<boolean>(false);

// propriétés du formulaire
const newPassword = ref<string>('');
const confirmNewPassword = ref<string>('');

// états de validation
const newPasswordValid = ref<boolean>(true);
const confirmNewPasswordValid = ref<boolean>(true);

// regexp
const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!*]).{8,}$/;

// fonctions de validation des champs
const validateNewPassword = (): void => {
    newPasswordValid.value = passwordRegex.test(newPassword.value);
};
const validateConfirmNewPassword = (): void => {
    confirmNewPasswordValid.value = newPassword.value === confirmNewPassword.value;
};

// utilise la route pour récupérer le token 
const route = useRoute();
const token = route.params.token;

// valide le formulaire
const updatePassword = async (): Promise<void> => {

    // valide les champs individuels
    validateNewPassword();
    validateConfirmNewPassword();

    // extrait la valeur de l'objet ref
    const newPasswordValue: string = newPassword.value;

    // soumet le formulaire avec le champ requis
    if (newPasswordValid.value && confirmNewPasswordValid.value) {

        try {

            isLoading.value = true;

            const { hostName } = useGlobalDataStore();

            // utilise fetch pour envoyer la requête PUT
            const response = await fetch(`${hostName}/admin-password-reset/reset-password/${token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newPassword: newPasswordValue,
                }),
            });

            if (response.ok) {
                // réinitialisation du mot de passe réussie
                const data = await response.json();
                console.log(data.message);
                successMessage.value = true;

            } else {
                // affiche un message d'erreur à l'utilisateur
                console.error('Erreur lors de la réinitialisation du mot de passe', response.statusText)
                errorMessage.value = true;
            }

        } catch (error) {
            console.error('Erreur lors de la réinitialisation du mot de passe: ', error);
        }
    }
}

const router = useRouter(); 
// redirige vers la page de connexion 
const backToLoginPage = (): void => {
    router.push('/');
};

const resetForm = () => {
    newPassword.value = ('');
    confirmNewPassword.value = ('');
    isLoading.value = false;
};

// permet de revenir au formulaire réinitialisé 
const backToResetPasswordForm = () => {
    resetForm();
    errorMessage.value = false;
};

</script>

<template>
    <div class="registration-result_message" v-if="errorMessage"> 
        <p class="notification error">Une erreur s'est produite !</p>
        <ReusablePrimaryButton class="adminLoginPage-button" type="submit" @click="backToResetPasswordForm">Retour</ReusablePrimaryButton>
    </div>
    <div class="registration-result_message" v-else-if="successMessage">
        <p class="notification success">Mot de passe mis à jour avec succès !</p>
        <ReusablePrimaryButton class="adminLoginPage-button" type="submit" @click="backToLoginPage">Me connecter</ReusablePrimaryButton>
    </div>
    <form class="adminLoginPage-form" @submit.prevent="updatePassword" v-else>
        <p class="notification">Renseignez ici votre nouveau mot de passe (doit contenir au moins 8 caractères dont: 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial).</p>
        <div class="inputs_wrapper">
            <div class="input_container">
                <label for="newPassword">Nouveau mot de passe</label>
                <input type="password" name="newPassword" required id="admin_newPassword" v-model="newPassword" @input="validateNewPassword">
                <Icon v-if="newPasswordValid && newPassword !== ''"  icon="ooui:success" class="validateIcon"/>
                <p v-if="!newPasswordValid && newPassword !== ''" class="error-message">Merci d'entrer un nouveau mot de passe conforme</p>
            </div>
            <div class="input_container">
                <label for="newPassword">Confirmez le mot de passe</label>
                <input type="password" name="confirmNewPassword" required id="admin_confirmNewPassword" v-model="confirmNewPassword" @input="validateConfirmNewPassword">
                <Icon v-if="confirmNewPasswordValid && confirmNewPassword !== ''"  icon="ooui:success" class="validateIcon"/>
                <p v-if="!confirmNewPasswordValid && confirmNewPassword !== ''" class="error-message">N'est pas identique à votre nouveau mot de passe</p>
            </div>
        </div>
        <div class="adminLoginPage-button">
            <ButtonLoader v-if="isLoading" />
            <ReusablePrimaryButton type="submit" v-else>Envoyer</ReusablePrimaryButton>
        </div>
    </form> 
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/authFormStyle.scss';
@import '@/assets/sass/dashboard-styles/colors.scss';

.notification {
    margin: 0;
    font-size: .9rem;
    font-weight: 400;
}
.error-message {
    margin: 0;
    font-size: .7rem;
    align-self: flex-end;
    color: $errorColor;
}

.registration-result_message {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    .error {
        color: $errorColor;
    }
    .adminLoginPage-button {
        align-self: self-end;
        cursor: pointer;
    }
}

</style>
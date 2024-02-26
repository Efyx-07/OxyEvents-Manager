<script setup lang="ts">

import ReusablePrimaryButton from '@/sub-components/ReusablePrimaryButton.vue';
import ButtonLoader from '@/sub-components/ButtonLoader.vue';
import { ref } from 'vue';
import { useGlobalDataStore } from '@/stores/GlobalDataStore';

// statut visibilité par défaut des messages d'erreur et de succès
const emailNotFound = ref<boolean>(false);
const successMessage = ref<boolean>(false);

// visibilité par défaut du loader
const isLoading = ref<boolean>(false);

// propriété du formulaire
const email = ref<string>('');

// état de validation
const emailValid = ref<boolean>(false);

// regexp
const emailRegex: RegExp = /^[a-z0-9.-]+@[a-z0-9._-]{2,}\.[a-z]{2,8}$/;

// fonction de validation
const validateEmail = (): void => {
    emailValid.value = emailRegex.test(email.value);
};

// valide le formulaire 
const sendResetLink = async (): Promise<void> => {

    //valide le champ email
    validateEmail();

    // extrait la valeur de l'objet ref
    const emailValue: string = email.value;

    try {

        isLoading.value = true;

        const { hostName } = useGlobalDataStore();

        const response: Response =  await fetch(`${hostName}/admin-password-reset/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',    
            },
            body: JSON.stringify({
                email: emailValue
            }),
        });

        if (response.ok) {
            // affiche le message de réussite de la demande
            const data = await response.json();
            console.log(data.message)
            successMessage.value = true;

        } else {
            // affiche le message d'erreur
            console.error('Erreur lors de la demande de réinitialisation: ', response.statusText);
            emailNotFound.value = true;
        }

    } catch (error) {
        console.error('Erreur lors de la demande de réinitialisation :', error);
    };
};

// fonction de réinitialisation du formulaire
const resetForm = (): void => {
    email.value = ('');
    emailValid.value = false;
    isLoading.value = false;
};

// reviens au formulaire précédent réinitialisé
const backToForgotPasswordForm = (): void => {
    resetForm();
    emailNotFound.value = false;
};

</script>

<template> 
    <div class="registration-result_message" v-if="emailNotFound">
        <p class="notification error">Désolé, nous n'avons pas trouvé votre adresse en base de données !</p>
        <ReusablePrimaryButton class="adminLoginPage-button" type="submit" @click="backToForgotPasswordForm">D'accord</ReusablePrimaryButton>
    </div>
    <div class="registration-result_message" v-else-if="successMessage">
        <p class="notification success">Nous vous avons envoyé un lien de réinitialisation de votre mot de passe sur <strong>{{ email }}</strong> !</p>
    </div>
    <form class="adminLoginPage-form" @submit.prevent="sendResetLink" v-else>
        <p class="notification">Renseignez de nouveau votre adresse email, si celle-ci existe dans la base de données vous recevrez un lien de réinitialisation de votre mot de passe.</p>
        <div class="inputs_wrapper">
            <div class="input_container">
                <label for="email">Email</label>
                <input type="email" name="email" required id="admin_email" v-model="email" @input="validateEmail">
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
.notification {
    margin: 0;
    font-size: .9rem;
    font-weight: 400;
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

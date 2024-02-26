<script setup lang="ts">

import { Icon } from '@iconify/vue';
import ReusablePrimaryButton from '@/sub-components/ReusablePrimaryButton.vue'
import { ref } from 'vue';
import { useGlobalDataStore } from '@/stores/GlobalDataStore';
import { useAdminStore } from '@/stores/AdminStore';
import { useRoute, useRouter } from 'vue-router';

// statut de visibilité par défaut des messages d'erreur et de succès
const errorMessage = ref(false);
const successMessage = ref(false);

// propriétés du formulaire
const lastName = ref('');
const firstName = ref('');
const password = ref('');
const confirmPassword = ref('');

// états de validation
const lastNameValid = ref(true);
const firstNameValid = ref(true);
const passwordValid = ref (true);
const confirmPasswordValid = ref (true);

// Regex
const nameTypeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!*]).{8,}$/;

// fonctions de validation pour chaque champ
const validateLastName = () => {
    lastNameValid.value = nameTypeRegex.test(lastName.value);
};
const validateFirstName = () => {
    firstNameValid.value = nameTypeRegex.test(firstName.value);
};
const validatePassword = () => {
    passwordValid.value = passwordRegex.test(password.value);
};
const validateConfirmPassword = () => {
    confirmPasswordValid.value = password.value === confirmPassword.value;
};

// utilise la route pour récupérer le token et l'adresse email
const route = useRoute();
const token = route.params.token;
const emailFromURL = route.query.email;

// valide le formulaire
const validateAdminRegistration = async () => {

    // valide chaque champ individuellement
    validateLastName(); 
    validateFirstName();
    validatePassword();
    validateConfirmPassword();

    // extrait les valeurs des objets ref
    const lastNameValue = lastName.value;
    const firstNameValue = firstName.value;
    const emailValue = emailFromURL;
    const passwordValue = password.value;

    // détermine les champs requis pour soumettre le formulaire
    const requiredFieldsValid = 
        lastNameValid.value &&
        firstNameValid.value &&
        passwordValid.value &&
        confirmPasswordValid.value;

    // soumet le formulaire avec les champs requis
    if (requiredFieldsValid) {

        try {

            const { hostName } = useGlobalDataStore();

            const response = await fetch (`${hostName}/admins/register/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    lastName: lastNameValue,
                    firstName: firstNameValue,
                    email: emailValue,
                    password: passwordValue,
                }),
            });

            if (response.ok) {

                // inscription réussie 
                const data = await response.json();
                // met à jour la liste des administrateurs
                const adminStore = useAdminStore();
                adminStore.addToAdmins(data.admin);

                // affiche la notification de succés
                successMessage.value = true;


            } else {
                // affiche un message d'erreur à l'utilisateur.
                console.error('Erreur lors de l\'inscription du nouvel administrateur: ', response.statusText);
                errorMessage.value = true;
            }

        } catch (error) {
            console.error('Erreur lors de l\'inscription du nouvel administrateur: ', error);
        }
    } else {
        // Affiche un message d'erreur à l'utilisateur si le formulaire n'est pas valide
        console.error('Veuillez corriger les erreurs dans le formulaire.');
    }
};

const router = useRouter();

// redirige vers la page de navigation
const navigateToLoginPage = () => {
    router.push('/');
};

// réinitialise le formulaire
const resetForm = () => {
    lastName.value = '';
    firstName.value = '';
    password.value = '';
    confirmPassword.value = '';
};

// revient au formulaire réinitialisé
const backToResetForm = () => {
    resetForm()
    errorMessage.value = false;
};

</script>

<template>
    <div class="registration-result_message" v-if="errorMessage"> 
        <p class="notification error">Une erreur s'est produite !</p>
        <ReusablePrimaryButton class="button" type="submit" @click="backToResetForm">Retour</ReusablePrimaryButton>
    </div>
    <div class="registration-result_message" v-else-if="successMessage">
        <p class="notification success">Votre avez été inscrit avec succés, connectez-vous à votre compte !</p>
        <ReusablePrimaryButton class="button" type="submit" @click="navigateToLoginPage">Me connecter</ReusablePrimaryButton>
    </div>
    <form class="adminLoginPage-form" @submit.prevent="validateAdminRegistration" v-else>
        <div class="inputs_wrapper">
            <div class="input_container">
                <label for="newAdmin_email">Votre adresse mail : </label>     
                <p class="mailAddress">{{ emailFromURL }}</p>   
            </div>
            <div class="input_container">
                <label for="newAdmin_lastName">Votre nom</label>
                <input type="text" name="lastName" required id="newAdminLastName" v-model="lastName" @input="validateLastName">
                <Icon v-if="lastNameValid && lastName !== ''" icon="ooui:success" class="validateIcon"/>
                <p  v-if="!lastNameValid && lastName !== ''" class="error-message">Merci d'entrer un nom valide</p>
            </div>
            <div class="input_container">
                <label for="newAdmin_firstName">Votre prénom</label>
                <input type="text" name="firstName" required id="newAdminFirstName" v-model="firstName" @input="validateFirstName">
                <Icon v-if="firstNameValid && firstName !== ''" icon="ooui:success" class="validateIcon"/>
                <p v-if="!firstNameValid && firstName !== ''" class="error-message">Merci d'entrer un prénom valide</p>
            </div>
            <div class="input_container specInput">
                <div class="label_container">
                    <label for="newAdmin_password">Votre mot de passe</label>
                    <p class="notification">
                        (doit contenir au moins 8 caractères dont: 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial)
                    </p>
                </div>
                <input type="password" name="password" required id="newAdminPassword" v-model="password" @input="validatePassword">
                <Icon v-if="passwordValid && password !== ''" icon="ooui:success" class="specInput-validateIcon"/>
                <p v-if="!passwordValid && password !== ''" class="error-message">Merci d'entrer un mot de passe conforme</p>
            </div>
            <div class="input_container">
                <label for="confirm_newAdmin_password">Confirmez votre mot de passe</label>
                <input type="password" name="confirmPassword" required id="confirmNewAdminPassword" v-model="confirmPassword" @input="validateConfirmPassword">
                <Icon v-if="confirmPasswordValid && confirmPassword !== ''" icon="ooui:success" class="validateIcon"/>
                <p v-if="!confirmPasswordValid && confirmPassword !== ''" class="error-message">N'est pas identique à votre mot de passe</p>
            </div>
        </div>
        <ReusablePrimaryButton class="adminLoginPage-button" type="submit">Créer mon compte</ReusablePrimaryButton>
    </form>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/authFormStyle.scss';
@import '@/assets/sass/dashboard-styles/colors.scss';
.input_container {
    .mailAddress {
        margin: 0;
        font-size: .8rem; 
        font-weight: 700;
    }
    .label_container {
        display: flex;
        flex-direction: column;
        .notification {
            margin: 0;
            font-size: .7rem;
            font-weight: 700;
        }
    }
    .error-message {
        margin: 0;
        font-size: .7rem;
        align-self: flex-end;
        color: $errorColor;
    }
} 

</style>
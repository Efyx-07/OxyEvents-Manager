<script setup lang="ts">

import ReusablePrimaryButton from '@/sub-components/ReusablePrimaryButton.vue';
import ButtonLoader from '@/sub-components/ButtonLoader.vue';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { useGlobalDataStore } from '@/stores/GlobalDataStore';

// MODE DEMO
import DemoNotification from '@/sub-components/DemoNotification.vue'; 
import { useAdminStore } from '@/stores/AdminStore';
// MODE DEMO: extrait le statut de l'administrateur connecté
const adminStore = useAdminStore();
const adminStatus: "SUPERADMIN" | "ADMIN" | "GENERIC" | "GUEST" = adminStore.adminData.status
// MODE DEMO visibilité par défaut de la notification
const demoNotification = ref<boolean>(false);

// visibilité par défaut du loader
const isLoading = ref<boolean>(false);

// visibilité par défaut des messages de succés ou d'erreur
const successMessage = ref<boolean>(false);
const emailAlreadyExistsMessage = ref<boolean>(false);

// propriété du formulaire
const newAdminMail = ref<string>('');

// etat de validation
const newAdminMailValid = ref<boolean>(true);

// regex
const emailRegex: RegExp = /^[a-z0-9.-]+@[a-z0-9._-]{2,}\.[a-z]{2,8}$/;

// fonction de validation du champ
const validateNewAdminMail = (): void => {
    newAdminMailValid.value = emailRegex.test(newAdminMail.value);
};

// valide le formulaire 
const sendInvitationToAdmin = async (): Promise<void> => {

    // valide le champs requis
    validateNewAdminMail();

    // extrait la valeur de l'objet ref
    const newAdminMailValue = newAdminMail.value

    // soumet le formulaire 
    if (newAdminMailValid.value) {
        // CONDITION POUR LE MODE DEMO
        if (adminStatus !== 'GUEST') {

            try {

                isLoading.value = true;

                const { hostName } = useGlobalDataStore();

                const response = await fetch (`${hostName}/admins/invit-admin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: newAdminMailValue,
                    }),
                });

                if (response.ok) {

                    // invitation envoyée avec succés
                    const data = await response.json();
                    console.log(data);

                    successMessage.value = true;

                    // réinitialise le formulaire au bout de 5s
                    setTimeout(() => {
                        resetForm();
                    }, 5000); 

                } else if (response.status === 400) {

                    // administrateur existe déjà avec un même email
                    console.error('Un administrateur avec cet email existe déjà.');
                    emailAlreadyExistsMessage.value = true

                    // réinitialise le formulaire au bout de 5s
                    setTimeout(() => {
                        resetForm();
                    }, 5000); 

                } else {
                    // affiche un message d'erreur à l'utilisateur.
                    console.error('Erreur lors de l\'envoi de l\'invitation: ', response.statusText);
                }

            } catch (error) {
                console.error('Erreur lors de l\'envoi de l\'invitation: ', error);
            }
        } else {
            // remplace le bouton pour informer du mode DEMO
            demoNotification.value = true;
            setTimeout(() => {
                demoNotification.value = false;
            }, 3000)
        };
    } else {
        // Affiche un message d'erreur à l'utilisateur si le formulaire n'est pas valide
        console.error('Veuillez renseignez un autre email.');
    }
};

const resetForm = (): void => {
    successMessage.value = false;
    emailAlreadyExistsMessage.value = false;
    newAdminMail.value = '';
    isLoading.value = false;
}

</script>

<template>
    <div class="registration-result_message" v-if="successMessage">
        <div class="text_container">
            <Icon icon="ooui:success" class="successIcon"/>
            <p>Invitation envoyée avec succés à <strong>{{ newAdminMail }}</strong> !</p>
        </div>
        <ReusablePrimaryButton @click="resetForm">Ok</ReusablePrimaryButton>
    </div>
    <div class="registration-result_message" v-else-if="emailAlreadyExistsMessage">
        <div class="text_container">
            <Icon icon="mdi:alert-outline" class="alertIcon"/>
            <p>Un administrateur existe déjà avec l'adresse <strong>{{ newAdminMail }}</strong> !</p>
        </div>
        <ReusablePrimaryButton @click="resetForm">Compris</ReusablePrimaryButton>
    </div>
    <form class="adminMgmtForm" @submit.prevent="sendInvitationToAdmin" v-else>
        <div class="fields_wrapper">
            <div class="field_container">
                <div class="label_container">
                    <label for="newAdminMail">Adresse mail du nouvel administrateur</label>
                </div>
                <div class="input_container">
                    <input type="email" name="newAdminMail" id="newAdminMail" v-model="newAdminMail" @input="validateNewAdminMail">
                    <Icon v-if="newAdminMailValid && newAdminMail !== ''"  icon="ooui:success" class="validateIcon"/>
                </div>
                <p v-if="!newAdminMailValid && newAdminMail !== ''" class="error-message">Merci d'entrer un email conforme</p>
            </div>
        </div>
        <!-- MODE DEMO -->
        <DemoNotification v-if="demoNotification"/>
        <div class="adminMgmtForm-button" v-else>
            <ButtonLoader v-if="isLoading"/>
            <ReusablePrimaryButton class="adminMgmtForm-button" type="submit" v-else>Envoyer l'invitation</ReusablePrimaryButton>
        </div>
    </form>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/adminMgmtFormStyle.scss';
.demoNotification {
    align-self: self-end;
}

</style>
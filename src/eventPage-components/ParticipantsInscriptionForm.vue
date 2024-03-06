<script setup lang="ts">

import { ref } from 'vue';
import { useGlobalDataStore } from '@/stores/GlobalDataStore';
import InscriptionConfirmation from '@/eventPage-subComponents/InscriptionConfirmation.vue';

//datas
const requiredFieldMention: string = '*';

// statut de visibilité du formulaire
const formIsvisible = ref<boolean>(true);

// statut de visibilité du message d'erreur dans le cas où le participant est déjà inscrit 
const isAlreadyRegisteredMessage = ref<boolean>(false);

// propriétés du formulaire
const entrepriseOrganisation = ref<string>('');
const nom = ref<string>('');
const prenom = ref<string>('');
const telephone = ref<string>('');
const email = ref<string>('');

// etats de validation
const entrepriseOrganisationValid = ref<boolean>(true);
const nomValid = ref<boolean>(true);
const prenomValid = ref<boolean>(true);
const telephoneValid = ref<boolean>(true);
const emailValid = ref<boolean>(true);

// RegExp
const companyNameRegex: RegExp = /^[a-zA-Z0-9\s.,'-]*$/;
const nameRegex: RegExp = /^[\p{L}\sçÇ'-]+$/u;
const phoneFrenchNumbersRegex: RegExp = /^(0[1-7])[\d]{8}$/;
const emailRegex: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// fonctions de validation pour chaque champ
const validateEntrepriseOrganisation = (): void => {
    entrepriseOrganisationValid.value = companyNameRegex.test(entrepriseOrganisation.value);   
};
const validateNom = (): void => {
    nomValid.value = nameRegex.test(nom.value);
};
const validatePrenom = (): void => {
    prenomValid.value = nameRegex.test(prenom.value);
};
const validateTelephone = (): void => {
    telephoneValid.value = phoneFrenchNumbersRegex.test(telephone.value);
};
const validateEmail = (): void => {
    emailValid.value = emailRegex.test(email.value);
};

// valide le formulaire
const validate = async(event: any): Promise<void> => {
    event.preventDefault();

    // valide chaque champ individuellement
    validateEntrepriseOrganisation();
    validateNom();
    validatePrenom();
    validateTelephone();
    validateEmail();

    // extrait les valeurs des objets ref
        
    const entrepriseOrganisationValue: string = entrepriseOrganisation.value;
    const nomValue: string  = nom.value;
    const prenomValue: string  = prenom.value;
    const telephoneValue: string  = telephone.value;
    const emailValue: string  = email.value;

    // détermine les champs requis pour soumettre le formulaire
    const requiredFieldsValid: boolean = 
        entrepriseOrganisationValid.value &&
        nomValid.value &&
        prenomValid.value &&
        emailValid.value;

    // soumet le formulaire avec les champs requis
    if (requiredFieldsValid) {

        try {

            const { hostName } = useGlobalDataStore();
            const eventSlug = window.location.pathname.split('/').pop(); // récupère le slug de l'événement depuis l'URL

            const response = await fetch(`${hostName}/users/${eventSlug}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    entrepriseOrganisation: entrepriseOrganisationValue,
                    nom: nomValue,
                    prenom: prenomValue,
                    telephone: telephoneValue,
                    email: emailValue,
                }),
            })

            if (response.ok) {

                // affiche le message d'inscription réussie ici
                const data = await response.json();
                console.log(data)
                // change le statut de la visibilité du formulaire à false
                formIsvisible.value = false;
                    
            } else if (response.status === 400) {

                // si l'utilisateur est déjà inscrit avec la même adresse mail, affiche le message d'erreur et reinitialise le formulaire
                isAlreadyRegisteredMessage.value = true;
                setTimeout(() => {
                    isAlreadyRegisteredMessage.value = false;
                    resetForm();
                }, 3000); 

            } else {
                // affiche un message d'erreur à l'utilisateur.
                console.error('Erreur lors de l\'inscription :', response.statusText);
            }

        } catch (error) {
            console.error('Erreur lors de l\'inscription: ', error);
        }

    } else {
        console.log('Formulaire non valide');
    }

};

// fonction pour réinitialiser le formulaire
const resetForm = (): void => {
    entrepriseOrganisation.value = '';
    nom.value = '';
    prenom.value = '';
    telephone.value = '';
    email.value = '';
};

</script>

<template>
    <form class="inscriptionForm" @submit.prevent="validate" v-if="formIsvisible">
        <div class="input-container">
            <label for="entreprise">Entreprise / Organisation <span>{{requiredFieldMention}}</span></label>
            <input type="text" 
                   name="entreprise_organisation"
                   required 
                   id="inscription_entreprise-organisation" 
                   v-model="entrepriseOrganisation" 
                   @input="validateEntrepriseOrganisation"
            >
            <p class="error-message" v-if="!entrepriseOrganisationValid && entrepriseOrganisation  !== ''">Merci d'entrer un nom valide</p>   
        </div>
        <div class="input-container">
            <label for="nom">Nom <span>{{requiredFieldMention}}</span></label>
            <input type="text" 
                   name="nom" 
                   required 
                   id="inscription_nom" 
                   v-model="nom" 
                   @input="validateNom"
            >
            <p class="error-message" v-if="!nomValid && nom !== ''">Merci d'entrer un nom valide</p>  
        </div>
        <div class="input-container">
            <label for="prenom">Prénom <span>{{requiredFieldMention}}</span></label>
            <input type="text" 
                   name="prenom" 
                   required 
                   id="inscription_prenom" 
                   v-model="prenom" 
                   @input="validatePrenom"
            >
            <p class="error-message" v-if="!prenomValid && prenom !== ''">Merci d'entrer un prénom valide</p>  
        </div>
        <div class="input-container">
            <label for="telephone">Téléphone</label>
            <input type="tel" 
                   name="telephone"
                   id="inscription_telephone" 
                   v-model="telephone" 
                   @input="validateTelephone"
            >
            <p class="error-message" v-if="!telephoneValid && telephone !== ''">Merci d'entrer un numéro de téléphone valide</p>  
        </div>
        <div class="input-container">
            <label for="email">Email <span>{{requiredFieldMention}}</span></label>
            <input type="email" 
                   name="email" 
                   required 
                   id="inscription_email" 
                   v-model="email" 
                   @input="validateEmail"
            >
            <p class="error-message" v-if="!emailValid && email !== ''">Merci d'entrer un email valide</p>  
        </div>
        <p class="requiredFields-info"><span>{{requiredFieldMention}}</span> Champs obligatoires</p>
        <p class="alreadyRegistered-message" v-if="isAlreadyRegisteredMessage">Vous êtes déjà inscrit à cet évènement !</p>
        <button class="btn" type="submit">
            <p>Je m'inscris</p>
        </button>
    </form>
    <InscriptionConfirmation v-else/> 
</template>

<style lang="scss" scoped>

@import '@/assets/sass/eventPage-styles/buttonStyle.scss';

.inscriptionForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
    width: 100%;

    .input-container {
        display: flex;
        flex-direction: column;
        gap: .5rem;
        width: 100%;
        position: relative;

        label {
            font-size: 1rem;
            color: $blackColor;
            span {
                color: $accentColorPrimary;
            }
        }

        input {
            width: 100%;
            height: 3rem;
            font-size: 1rem;
            background: $whiteColor;
            border: solid 1px $blackTransparency;

            &:focus {
                border-color: $accentColorPrimary !important;
                outline: none;
            }
        }
        .error-message {
            margin: 0;
            font-size: .7rem;
            color: $errorColor;
            align-self: flex-end;
            position: absolute;
            right: .5rem;
            bottom: .5rem;
        }
    }
    .requiredFields-info {
        font-size: .7rem;
        margin: 0;
        align-self: flex-end;

        span {
            color: $accentColorPrimary;
        }
    }
    .alreadyRegistered-message {
        margin: 0;
        color: $errorColor;
    }
    .btn {
        width: 14rem;
        margin-top: 1rem;
    }
}
    
</style>
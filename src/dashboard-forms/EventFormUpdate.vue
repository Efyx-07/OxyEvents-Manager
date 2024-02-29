<script setup>

import { ref, computed, watchEffect, onMounted } from 'vue';
import { useGlobalDataStore } from '@/stores/GlobalDataStore';
import { useEventStore } from '@/stores/EventStore';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import ReusablePrimaryButton from '@/sub-components/ReusablePrimaryButton.vue';
import ReusableSecondaryButton from '@/sub-components/ReusableSecondaryButton.vue';
import ButtonLoader from '@/sub-components/ButtonLoader.vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// MODE DEMO
import DemoNotification from '@/sub-components/DemoNotification.vue'; 
import { useAdminStore } from '@/stores/AdminStore';
// MODE DEMO: extrait le statut de l'administrateur connecté
const adminStore = useAdminStore();
const adminStatus = adminStore.adminData.status
// MODE DEMO visibilité par défaut de la notification
const demoNotification = ref(false);

// visibilité par défaut du loader
const isLoading = ref(false);

// recupère la props de selectedEvents en provenance de BackOfficeEventUpdatePage
const { selectedEvent } = defineProps(['selectedEvent']);

// data
const notification = '(Sans choix de votre part, l\'image actuelle restera en place)'
const { removeImageIconName } = useGlobalDataStore();

// convertit la date de l'API en une date locale
const dateFromAPI = new Date(selectedEvent.date);
// ajuste l'heure à midi (12:00) pour éviter les problèmes de fuseau horaire
dateFromAPI.setHours(12, 0, 0, 0);
// formate la date pour pour préremplissage de l'input type "date"
const formattedDate = computed(() => {
    return dateFromAPI.toISOString().split('T')[0];
});

// nouvelle variable réactive pour stocker la date modifiée par l'utilisateur
const userSelectedDate = ref(formattedDate.value);

// mettre cette nouvelle variable quand l'utilisateur modifie la date
watchEffect(() => {
    if (userSelectedDate.value !== formattedDate.value) {
        formattedDate.value = userSelectedDate.value;
    }
})

// propriétés du formulaire
const newEventTitle = ref(selectedEvent.title);
const newEventCoverImage = ref('');
const newEventDate = ref(userSelectedDate);
const newEventLocation = ref(selectedEvent.location);
const newEventPresentation = ref(selectedEvent.presentation);
const newEventProgramme = ref(selectedEvent.programme);
const newEventPracticalInformations = ref(selectedEvent.practicalInformations);
const newEventOrganizerName = ref(selectedEvent.organizerName);
const newEventOrganizerLogo = ref('');
const newEventOrganizerWebsite  = ref(selectedEvent.organizerWebsite);

// propriétés des previews de l'image de couverture et du logo organisateur
const coverImagePreview = ref('');
const organizerLogoPreview = ref('');

// récupère l'ID de l'évènement sélectionné
const selectedEventId = ref(selectedEvent.id);
const eventId = selectedEventId.value;

// gère le téléchargement du fichier image de couverture et stocke le fichier selectionné
const handleNewCoverImageFileChange = (event) => {
    newEventCoverImage.value = event.target.files[0];

    // permet la preview de l'image de couverture
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            coverImagePreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

// gère le téléchargement du fichier logo de l'organisateur et stocke le fichier selectionné
const handleNewOrganizerLogoFileChange = (event) => {
    newEventOrganizerLogo.value = event.target.files[0];

    // permet la preview du logo de l'organisateur
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            organizerLogoPreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

// supprime l'image de couverture en preview
const removeCoverImageFromPreview = () => {
    coverImagePreview.value = '';
};

// supprime le logo de l'organisateur en preview
const removeOrganizerLogoFromPreview = () => {
    organizerLogoPreview.value = '';
};

// crée une instance CKEditor
const editor = ClassicEditor;
let editorDataNewPresentation = ref(selectedEvent.presentation);
let editorDataNewProgramme = ref(selectedEvent.programme);
let editorDataNewPracticalInformations = ref(selectedEvent.practicalInformations);
const editorConfig = {
    toolbar: {
        items: [
            'bold', 
            'italic',
            'link',
            'bulletedList', 
            'numberedList', 
            'undo', 
            'redo'
        ]
    },
    language: 'fr',
    link: {
        decorators: {
            addTargetToExternalLinks: {
                mode: 'automatic',
                callback: url => /^(https?:)?\/\//.test( url ),
                attributes: {
                    target: '_blank',
                    rel: 'noopener noreferrer'
                }
            }
        }
    }
};

// lie les editorData aux propriétés du formulaire envoyées
onMounted(() => {
    editorDataNewPresentation.value = newEventPresentation.value;
    editorDataNewProgramme.value = newEventProgramme.value;
    editorDataNewPracticalInformations.value = newEventPracticalInformations.value;
});

// fonctions pour mettre à jour les propriétés du formulaires quand le contenu de l'éditeur change
const updateNewEventPresentation = (event) => {
    newEventPresentation.value = event;
};
const updateNewEventProgramme = (event) => {
    newEventProgramme.value = event;
};
const updateNewEventPracticalInformations = (event) => {
    newEventPracticalInformations.value = event;
};

const eventStore = useEventStore();
const router = useRouter();

// soumet le formulaire
const updateEvent = async () => {

    const formData = new FormData();

    formData.append('newEventTitle', newEventTitle.value);
    formData.append('newEventCoverImage', newEventCoverImage.value);
    formData.append('newEventDate', newEventDate.value);
    formData.append('newEventLocation', newEventLocation.value);
    formData.append('newEventPresentation', newEventPresentation.value);
    formData.append('newEventProgramme', newEventProgramme.value);
    formData.append('newEventPracticalInformations', newEventPracticalInformations.value);
    formData.append('newEventOrganizerName', newEventOrganizerName.value);
    formData.append('newEventOrganizerLogo', newEventOrganizerLogo.value);
    formData.append('newEventOrganizerWebsite', newEventOrganizerWebsite.value);

    // vérifie si un fichier image de couverture a été sélectionné
    if (!newEventCoverImage.value) {
        // laisse l'image actuelle de l'événement en place
        formData.delete('newEventCoverImage');
    }

    // affiche les valeurs dans la console
    for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
    }

    // CONDITION POUR LE MODE DEMO
    if (adminStatus !== 'GUEST') {

        try {

            isLoading.value = true;

            const { hostName } = useGlobalDataStore();
            
            const response = await fetch (`${hostName}/events/${eventId}`, {
                method: 'PUT', 
                body: formData,           
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Réponse de l\'API:', data.message);

                // charge les données des évènements
                await eventStore.loadEventsData();

                // renvoie vers une page de redirection
                router.push('/updated_event-confirmation');

            } else {
                console.error('Erreur lors de la mise à jour de l\'evenement :', response.statusText);
            }

        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'evenement :', error);
        }

    } else {
        // remplace le bouton pour informer du mode DEMO
        demoNotification.value = true;
        setTimeout(() => {
            demoNotification.value = false;
        }, 3000)
    };
};

// reconduis vers la page 'vos évènements'
const navigateToHomepage = () => {
    isLoading.value = false;
    router.push('/home');
};

</script>

<template>  
    <form class="eventForm" @submit.prevent="updateEvent" enctype="multipart/form-data">
        <div class="inputs_wrapper">
            <div class="input-container">
                <label for="newEvent-title">Titre de l'évènement</label>
                <input 
                    class="input-text"
                    type="text"
                    name="newEventTitle"
                    required
                    id="newEventTitle"
                    v-model="newEventTitle"
                >
            </div>
            <div class="coverImageInputAndPreview_container imageInputAndPreview_container">
                <div class="input-container" >
                    <div class="labelAndNotif_container">
                        <label for="newEvent-coverImage">Image de couverture</label>
                        <p class="notification">{{ notification }}</p>
                    </div>
                    <div class="image-input_container" v-if="!coverImagePreview">
                        <input
                            type="file"
                            name="newEventCoverImage"
                            accept="image/jpg, image/jpeg, image/png"
                            class="image-input"
                            id="newEventCoverImage"
                            @change="handleNewCoverImageFileChange"
                        >
                    </div>
                    <div class="coverImagePreview_container" v-else>
                        <img :src="coverImagePreview" class="coverImagePreview">
                        <div class="removeIcon_container" @click="removeCoverImageFromPreview">
                            <Icon :icon="removeImageIconName" class="removeIcon"/>
                        </div> 
                    </div>  
                </div> 
            </div>          
            <div class="input-container">
                <label for="newEvent-date">Date de l'évènement</label>
                <input 
                    class="input-text"
                    type="date"
                    name="newEventDate"
                    required
                    id="newEventDate"
                    v-model="userSelectedDate"
                >
            </div>
            <div class="input-container">
                <label for="newEvent-location">Lieu de l'évènement</label>
                <input 
                    class="input-text"
                    type="text"
                    name="newEventLocation"
                    required
                    id="newEventLocation"
                    v-model="newEventLocation"
                >
            </div>
            <div class="input-container">
                <label for="newEvent-presentation">Présentation de l'évènement</label>
                <ckeditor :editor="editor" v-model="editorDataNewPresentation" :config="editorConfig" @input="updateNewEventPresentation"></ckeditor>
            </div>
            <div class="input-container">
                <label for="newEvent-programme">Programme de l'évènement</label>
                <ckeditor :editor="editor" v-model="editorDataNewProgramme" :config="editorConfig" @input="updateNewEventProgramme"></ckeditor>
            </div>
            <div class="input-container">
                <label for="newEvent-practicalInformations">Informations pratiques</label>
                <ckeditor :editor="editor" v-model="editorDataNewPracticalInformations" :config="editorConfig" @input="updateNewEventPracticalInformations"></ckeditor>
            </div>
            <div class="input-container">
                <label for="newEvent-organizerName">Nom de l'organisateur</label>
                <input 
                    class="input-text"
                    type="text"
                    name="newEventOrganizerName"
                    required
                    id="newEventOrganizerName"
                    v-model="newEventOrganizerName"
                >
            </div>
            <div class="organizerLogoInputAndPreview_container imageInputAndPreview_container">
                <div class="input-container">
                    <div class="labelAndNotif_container">
                        <label for="newEvent-organizerLogo">Logo de l'organisateur</label>
                        <p class="notification">{{ notification }}</p>
                    </div>
                    <div class="image-input_container" v-if="!organizerLogoPreview">
                        <input 
                            type="file"
                            name="newEventOrganizerLogo"
                            accept="image/jpg, image/jpeg, image/png"
                            class="image-input"
                            id="newEventOrganizerLogo"
                            @change="handleNewOrganizerLogoFileChange"
                        >
                    </div>
                    <div class="organizerLogoPreview_container" v-else>
                        <img :src="organizerLogoPreview" class="organizerLogoPreview">
                        <div class="removeIcon_container" @click="removeOrganizerLogoFromPreview">
                            <Icon :icon="removeImageIconName" class="removeIcon"/>
                        </div>
                    </div>   
                </div>
            </div>
            <div class="input-container">
                <label for="newEvent-organizerWebsite">Site web de l'organisateur</label>
                <input 
                    class="input-text"
                    type="url"
                    name="newEventOrganizerWebsite"
                    placeholder="https://www.example.com"
                    required
                    id="newEventOrganizerWebsite"
                    v-model="newEventOrganizerWebsite"
                >
            </div>
        </div>
        <div class="eventForm-buttons_container">
            <ReusableSecondaryButton  @click="navigateToHomepage">Annuler</ReusableSecondaryButton> 
            <!-- MODE DEMO -->
            <DemoNotification v-if="demoNotification"/>
            <ButtonLoader v-else-if="isLoading"/>
            <ReusablePrimaryButton type="submit" v-else>Mettre à jour</ReusablePrimaryButton>
        </div>
    </form>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/eventHandlingFormStyle.scss';

</style>
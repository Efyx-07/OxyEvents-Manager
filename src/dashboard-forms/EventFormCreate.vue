<script setup lang="ts">

import { ref, onMounted } from 'vue';
import { useGlobalDataStore } from '@/stores/GlobalDataStore';
import { useEventStore } from '@/stores/EventStore';
import { useAdminStore } from '@/stores/AdminStore';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import ReusablePrimaryButton from '@/sub-components/ReusablePrimaryButton.vue';
import ReusableSecondaryButton from '@/sub-components/ReusableSecondaryButton.vue';
import ButtonLoader from '@/sub-components/ButtonLoader.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// MODE DEMO
import DemoNotification from '@/sub-components/DemoNotification.vue'; 

// data
const { removeImageIconName } = useGlobalDataStore();

// MODE DEMO visibilité par défaut de la notification
const demoNotification = ref<boolean>(false);

// visibilité par défaut du loader
const isLoading = ref<boolean>(false);

// propriétés du formulaire
const eventTitle = ref<string>('');
const eventCoverImage = ref<File | null>(null);
const eventDate = ref<string>('');
const eventLocation = ref<string>('');
const eventPresentation = ref<string>('');
const eventProgramme = ref<string>('');
const eventPracticalInformations = ref<string>('');
const eventOrganizerName = ref<string>('');
const eventOrganizerLogo = ref<File | null>(null);
const eventOrganizerWebsite  = ref<string>('');

// propriétés des previews de l'image de couverture et du logo organisateur
const coverImagePreview = ref<string>('');
const organizerLogoPreview = ref<string>('');

// gère le téléchargement du fichier image de couverture et stocke le fichier selectionné
const handleCoverImageFileChange = (event: any) => {
    eventCoverImage.value = event.target.files[0];

    // permet la preview de l'image de couverture
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target && e.target.result && typeof e.target.result === 'string') {
                coverImagePreview.value = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    }
};

// gère le téléchargement du fichier logo de l'organisateur et stocke le fichier selectionné
const handleOrganizerLogoFileChange = (event: any) => {
    eventOrganizerLogo.value = event.target.files[0];

    // permet la preview de l'image de couverture
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target && e.target.result && typeof e.target.result === 'string') {
                organizerLogoPreview.value = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    }
};

// supprime l'image de couverture en preview
const removeCoverImageFromPreview = (): void => {
    coverImagePreview.value = '';
};

// supprime le logo de l'organisateur en preview
const removeOrganizerLogoFromPreview = (): void => {
    organizerLogoPreview.value = '';
};

// crée une instance CKEditor
interface EditorConfig {
    toolbar: {
        items: string[];
    };
    language: string;
    link: {
        decorators: {
            addTargetToExternalLinks: {
                mode: string;
                callback: (url: string) => boolean;
                attributes: {
                    target: string;
                    rel: string;
                };
            };
        };
    };
}

const editor = ClassicEditor;

let editorDataPresentation = '';
let editorDataProgramme = '';
let editorDataPracticalInformations = '';

const editorConfig: EditorConfig = {
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
                callback: (url: string) => /^(https?:)?\/\//.test( url ),
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
    editorDataPresentation = eventPresentation.value;
    editorDataProgramme = eventProgramme.value;
    editorDataPracticalInformations = eventPracticalInformations.value;
});

interface CKEditorInputEvent {
    editor: any; // Type CKEditor si vous l'avez défini
    data: {
        value: string;
    };
}

// fonctions pour mettre à jour les propriétés du formulaires quand le contenu de l'éditeur change
const updateEventPresentation = (event: CKEditorInputEvent) => {
    eventPresentation.value = event.data?.value ?? '';
}
const updateEventProgramme = (event: CKEditorInputEvent) => {
    eventProgramme.value = event.data?.value ?? '';
};
const updateEventPracticalInformations = (event: CKEditorInputEvent) => {
    eventPracticalInformations.value = event.data?.value ?? '';
};

const eventStore = useEventStore();
const adminStore = useAdminStore();
const router = useRouter();

// soumet le formulaire
const validateEventCreation = async (): Promise<void> => {
        
    const formData: FormData = new FormData();

    formData.append('eventTitle', eventTitle.value);

    if (eventCoverImage.value) {
        formData.append('eventCoverImage', eventCoverImage.value, eventCoverImage.value.name);
    }

    formData.append('eventDate', eventDate.value);
    formData.append('eventLocation', eventLocation.value);
    formData.append('eventPresentation', eventPresentation.value);
    formData.append('eventProgramme', eventProgramme.value);
    formData.append('eventPracticalInformations', eventPracticalInformations.value);
    formData.append('eventOrganizerName', eventOrganizerName.value);

    if (eventOrganizerLogo.value) {
        formData.append('eventOrganizerLogo', eventOrganizerLogo.value, eventOrganizerLogo.value.name);
    }

    formData.append('eventOrganizerWebsite', eventOrganizerWebsite.value);

    const adminId = adminStore.adminData.id;

    formData.append('adminId', adminId.toString());

    // affiche les valeurs dans la console
    for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
    }

        // MODE DEMO: extrait le statut de l'administrateur connecté
        const adminStatus: "SUPERADMIN" | "ADMIN" | "GENERIC" | "GUEST" = adminStore.adminData.status
    // CONDITION POUR LE MODE DEMO
    if (adminStatus !== 'GUEST') {

        try {

            isLoading.value = true;

            const { hostName } = useGlobalDataStore();
            
            const response = await fetch (`${hostName}/events/create`, {
                method: 'POST', 
                body: formData,          
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Réponse de l\'API:', data.message);

                // ajoute le nouvel evenement dans la liste d'evenements dans le store
                eventStore.events.push(data.event);

                // charge les données des évènements
                await eventStore.loadEventsData();

                // renvoie vers une page de redirection
                router.push('/publication-confirmation');
                        
            } else {
                console.error('Erreur lors de la création d\'evenement :', response.statusText);
            }

        } catch(error) {
            console.error('Erreur lors de la création d\'evenement :', error);
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
    <form class="eventForm" @submit.prevent="validateEventCreation" enctype="multipart/form-data">
        <div class="inputs_wrapper">
            <div class="input-container">
                <label for="event-title">Titre de l'évènement</label>
                <input 
                    type="text"
                    name="eventTitle"
                    required
                    id="create_eventTitle"
                    class="input-text"
                    v-model="eventTitle"
                >
            </div>
            <div class="coverImageInputAndPreview_container imageInputAndPreview_container">
                <div class="input-container" >
                    <label for="event-coverImage">Image de couverture</label>
                    <div class="image-input_container" v-if="!coverImagePreview">
                        <input 
                            type="file"
                            name="eventCoverImage"
                            required
                            accept="image/jpg, image/jpeg, image/png"
                            class="image-input"
                            id="create_coverImage"
                            @change="handleCoverImageFileChange"
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
                <label for="event-date">Date de l'évènement</label>
                <input 
                    type="date"
                    name="eventDate"
                    required
                    id="create_eventDate"
                    class="input-text"
                    v-model="eventDate"
                >
            </div>
            <div class="input-container">
                <label for="event-location">Lieu de l'évènement</label>
                <input 
                    type="text"
                    name="eventLocation"
                    required
                    id="create_eventLocation"
                    class="input-text"
                    v-model="eventLocation"
                >
            </div>
            <div class="input-container">
                <label for="event-presentation">Présentation de l'évènement</label>
                <ckeditor :editor="editor" v-model="editorDataPresentation" :config="editorConfig" @input="updateEventPresentation"></ckeditor>
            </div>
            <div class="input-container">
                <label for="event-programme">Programme de l'évènement</label>
                <ckeditor :editor="editor" v-model="editorDataProgramme" :config="editorConfig" @input="updateEventProgramme"></ckeditor>
            </div>
            <div class="input-container">
                <label for="event-practicalInformations">Informations pratiques</label>
                <ckeditor :editor="editor" v-model="editorDataPracticalInformations" :config="editorConfig" @input="updateEventPracticalInformations"></ckeditor>
            </div>
            <div class="input-container">
                <label for="event-organizerName">Nom de l'organisateur</label>
                <input 
                    type="text"
                    name="eventOrganizerName"
                    required
                    id="create_eventOrganizerName"
                    class="input-text"
                    v-model="eventOrganizerName"
                >
            </div>
            <div class="organizerLogoInputAndPreview_container imageInputAndPreview_container">
                <div class="input-container">
                    <label for="event-organizerLogo">Logo de l'organisateur</label>
                    <div class="image-input_container" v-if="!organizerLogoPreview">
                        <input 
                            type="file"
                            name="eventOrganizerLogo"
                            required
                            accept="image/jpg, image/jpeg, image/png"
                            class="image-input"
                            id="create_eventOrganizerLogo"
                            @change="handleOrganizerLogoFileChange"
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
                <label for="event-organizerWebsite">Site web de l'organisateur</label>
                <input 
                    type="url"
                    name="eventOrganizerWebsite"
                    placeholder="https://www.example.com"
                    required
                    id="create_eventOrganizerWebsite"
                    class="input-text"
                    v-model="eventOrganizerWebsite"
                >
            </div>
        </div>
        <div class="eventForm-buttons_container">
            <ReusableSecondaryButton  @click="navigateToHomepage">Annuler</ReusableSecondaryButton>
            <!-- MODE DEMO -->
            <DemoNotification v-if="demoNotification"/>
            <ButtonLoader v-else-if="isLoading"/>
            <ReusablePrimaryButton type="submit" v-else>Publier l'évènement</ReusablePrimaryButton>
        </div>
    </form>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/eventHandlingFormStyle.scss';

</style>
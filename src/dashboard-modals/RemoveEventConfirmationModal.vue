<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref, onMounted } from 'vue';
import { useGlobalDataStore } from '@/stores/GlobalDataStore';
import { useEventStore } from '@/stores/EventStore';
import { useRouter } from 'vue-router';
import ReusablePrimaryButton from '@/sub-components/ReusablePrimaryButton.vue';
import ReusableSecondaryButton from '@/sub-components/ReusableSecondaryButton.vue';
import ReusableSeparator from '@/sub-components/ReusableSeparator.vue';

// MODE DEMO
import DemoNotification from '@/sub-components/DemoNotification.vue'; 
import { useAdminStore } from '@/stores/AdminStore';
// MODE DEMO: extrait le statut de l'administrateur connecté
const adminStore = useAdminStore();
const adminStatus: "SUPERADMIN" | "ADMIN" | "GENERIC" | "GUEST" = adminStore.adminData.status
// MODE DEMO visibilité par défaut de la notification
const demoNotification = ref<boolean>(false);

// statut par défaut de la visibilité de la fenetre
const isRemoveEventConfirmationModalVisible  = ref<boolean>(false);

interface EventToRemove {
    eventTitle: string;
    eventId: string | number;
}

// données de l'évènement à supprimer
const eventToRemove = ref<EventToRemove>({
    eventTitle:'',
    eventId:''
});

// permet la fermeture de la fenetre au click du bouton Annuler
const closeRemoveEventConfirmationModal = (): void => {
    isRemoveEventConfirmationModalVisible.value = false;
};

interface CustomEventDetail {
    eventTitle: string;
    eventId: string | number;
}

// ecoute l'événement personnalisé (créé sur 'BackOfficeEventCard') pour réafficher la fenetre
onMounted(() => {
    window.addEventListener('show-removeEventConfirmationModal', (event: Event) => {
        if ('detail' in event && typeof event.detail === 'object' && event.detail !== null) {
            const customDetail = event.detail as CustomEventDetail;
            isRemoveEventConfirmationModalVisible.value = true;
            // récupère les données de l'évènement à supprimer
            eventToRemove.value = customDetail;
        }
    });
});

const eventStore = useEventStore();
const router = useRouter();

// fonction pour confirmer la suppression de l'événement
const confirmRemoveEvent = async (): Promise<void> => {

    // CONDITION POUR LE MODE DEMO
    if (adminStatus !== 'GUEST') {

        try {

            const { hostName } = useGlobalDataStore();

            // recupère l'id de l'évènement à supprimer
            const eventId: string | number = eventToRemove.value.eventId;

            const response = await fetch(`${hostName}/events/${eventId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);

                // charge les données des évènements
                await eventStore.loadEventsData();

                // renvoie vers une page de redirection
                router.push('/removed_event-confirmation');

            } else {
                console.error('Erreur lors de la suppression de l\'événement');
            }

            // ferme la fenêtre modale de suppression
            isRemoveEventConfirmationModalVisible.value = false;
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'événement :', error);
        }
    } else {
        // remplace le bouton pour informer du mode DEMO
        demoNotification.value = true;
        setTimeout(() => {
            demoNotification.value = false;
        }, 3000)
    };
};

</script>

<template>
    <div class="modal" :class="{ hiddenRemoveEventConfirmationModal: !isRemoveEventConfirmationModalVisible }">
        <div class="modal-content">
            <div class="head-part">
                <div class="icon_container">
                    <Icon icon="mdi:alert-outline" class="icon"/>
                </div>
                <p>Supprimer l'évènement</p>
            </div>
            <ReusableSeparator/>
            <p class="eventTitle">"{{ eventToRemove.eventTitle }}"</p>
            <p class="alertMessage">Etes-vous sûr de vouloir supprimer l'evenement? Cette opération est irréversible et supprimera l'évènement et toutes ses données. </p>
            <ReusableSeparator/>            
            <div class="buttons_container">
                <ReusableSecondaryButton  @click="closeRemoveEventConfirmationModal">Annuler</ReusableSecondaryButton> 
                <!-- MODE DEMO -->
                <DemoNotification v-if="demoNotification"/>
                <ReusablePrimaryButton @click="confirmRemoveEvent" v-else>Confirmer</ReusablePrimaryButton>
            </div>            
            <Icon icon="ci:close-sm" class="closeIcon" @click="closeRemoveEventConfirmationModal"/>
        </div>
    </div>  
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/modalStyle';

.hiddenRemoveEventConfirmationModal {
    visibility: hidden;
    opacity: 0;
} 

.eventTitle {
    margin: 0;
    font-weight: 700;
}

</style>
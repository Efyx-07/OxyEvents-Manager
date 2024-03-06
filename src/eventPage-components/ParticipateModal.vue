<script setup lang="ts">

import type { Event } from '@/types/eventsTypes';
import { ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
//import Overlay from '@/components/Overlay.vue';
//import ParticipantsInscriptionForm from '@/sub-components/ParticipantsInscriptionForm.vue';

// recupère la props de selectedEvent en provenance de EventPage
const props = defineProps<{
    selectedEvent: Event;
}>();
    
// statut par défaut de la visibilité de la fenetre
const isParticipateModalVisible = ref<boolean>(false);

// permet la fermeture de la fenetre au click sur l'icone
const closeParticipateModal = () => {
    isParticipateModalVisible.value = false;
};

// déclenche evenement personnalisé 'hide-overlay' et ferme fenetre userLogin

/*const closeParticipateModalAndOverlay = () => {
    window.dispatchEvent(new Event('hide-overlay'));
    closeParticipateModal();
}*/

// ecoute l'événement personnalisé (créé sur 'ParticipateButton') pour réafficher la fenetre
onMounted(() => {
    window.addEventListener('show-participateModal', () => {
        isParticipateModalVisible.value = true;
    });
    /*
    window.addEventListener('hide-overlay', () => {
        isParticipateModalVisible.value = true; 
    }); */
});

</script>

<template>
    <div class="participateModal-container" :class="{ hiddenParticipateModal: !isParticipateModalVisible }">
        <div class="participateModal">
            <header>
                <Icon icon="ei:close" width="30" class="closeIcon" @click="closeParticipateModal"/>
            </header>
            <div class="modal_content">
                <div class="titleAndForm_container">
                    <h1 class="eventTitle">{{ props.selectedEvent.title }}</h1>
                    <!-- <ParticipantsInscriptionForm /> -->
                </div>
            </div>
            <footer>
                <div class="legalLinks_container">
                    <p>Conditions d'utilisation</p>
                    <p>Contact</p>
                </div>
            </footer>
        </div>  
    </div>
    <!-- <Overlay 
        :showOverlay="isParticipantsInscriptionModalVisible" 
        class="pageOverlay" 
        v-show="isParticipantsInscriptionModalVisible" 
    >
    </Overlay> -->
</template>

<style lang="scss" scoped>

@import '@/assets/sass/eventPage-styles/colors.scss';
@import '@/assets/sass/breakPoints.scss';

.hiddenParticipateModal { 
    transform: translateX(100%);
}

.participateModal-container {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 999;
    height: 100vh;
    width: 100%;
    max-width: 36rem;
    background: $whiteColor;
    background: red;
    transition: transform .3s ease-in-out;
}

</style>
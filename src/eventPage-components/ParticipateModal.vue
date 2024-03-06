<script setup lang="ts">

import type { Event } from '@/types/eventsTypes';
import { ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import EventPageOverlay from '@/eventPage-subComponents/EventPageOverlay.vue';
import ParticipantsInscriptionForm from '@/eventPage-components/ParticipantsInscriptionForm.vue';

// recupère la props de selectedEvent en provenance de EventPage
const props = defineProps<{
    selectedEvent: Event;
}>();
    
// statut par défaut de la visibilité de la fenetre
const isParticipateModalVisible = ref<boolean>(false);

// permet la fermeture de la fenetre au click sur l'icone
const closeParticipateModal = (): void => {
    isParticipateModalVisible.value = false;
};

// déclenche evenement personnalisé 'hide-overlay' et ferme fenetre userLogin
const closeParticipateModalAndOverlay = (): void => {
    window.dispatchEvent(new Event('hide-overlay'));
    closeParticipateModal();
};

// ecoute l'événement personnalisé (créé sur 'ParticipateButton') pour réafficher la fenetre
onMounted(() => {
    window.addEventListener('show-participateModal', () => {
        isParticipateModalVisible.value = true;
    });
    window.addEventListener('hide-overlay', () => {
        isParticipateModalVisible.value = true; 
    }); 
});

</script>

<template>
    <div class="participateModal-container" :class="{ hiddenParticipateModal: !isParticipateModalVisible }">
        <header>
            <Icon icon="ei:close" class="icon" @click="closeParticipateModalAndOverlay"/>
        </header>
        <div class="modal-content">
            <h1 class="eventTitle">{{ props.selectedEvent.title }}</h1>
            <ParticipantsInscriptionForm />
        </div>
        <footer>
            <div class="links">
                <p>Conditions d'utilisation</p>
                <p>Contact</p>
            </div>
        </footer>
    </div>
    <EventPageOverlay class="overlay" :showOverlay="isParticipateModalVisible" v-show="isParticipateModalVisible"></EventPageOverlay>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/eventPage-styles/colors.scss';

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
    transition: transform .3s ease-in-out;

    header {
        height: 3rem;
        padding: 0 1rem;
        display: flex;
        align-items: center;
        justify-content: right;

        .icon {
            font-size: 2rem;
            cursor: pointer;

            &:hover {
                color: $accentColorPrimary;
            }
        }
    }

    .modal-content {
        padding: 6rem 2rem;
        height: calc(100% - 3rem);
        display: flex;
        flex-direction: column;
        gap: 3rem;
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;

        &::-webkit-scrollbar {
            display: none;
        }

        .eventTitle {
            font-size: 1.5rem;
        }
    }

    footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 3rem;
        background: $whiteColor;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0 2rem;

        .links {
            display: flex;
            gap: 1rem;

            p {
                margin: 0;
                font-size: .8rem;
            }
        }
    }
}

</style>
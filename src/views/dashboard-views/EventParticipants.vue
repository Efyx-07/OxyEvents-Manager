<script setup lang="ts">

import NavAside from '@/dashboard-components/NavAside.vue';
import DashboardHeader from '@/dashboard-components/DashboardHeader.vue';
import ReusablePrimaryButton from '@/sub-components/ReusablePrimaryButton.vue';
import { ref, onMounted } from 'vue';
import { useEventStore } from '@/stores/EventStore';
import { fetchParticipantsData } from '@/services/participantsApi';
import { useRoute } from 'vue-router';
import type { Participant } from '@/types/participantsTypes';
import DataLoader from '@/sub-components/DataLoader.vue';
import ParticipantsBanner from '@/dashboard-components/ParticipantsBanner.vue';
import ParticipantsArray from '@/dashboard-components/ParticipantsArray.vue';

const eventStore = useEventStore();
const route = useRoute();

const eventTitle = ref<string>('');
const participants = ref<Participant[]>([]);

// affiche le loader si les données sont en cours de chargement
const datasAreAvailable = ref<boolean>(false);

// récupère le slug de la route
let eventSlug: string;

if (Array.isArray(route.params.eventSlug)) {
  // si c'est un tableau, prend la première valeur
  eventSlug = route.params.eventSlug[0];
} else {
  // sinon, c'est une chaîne directement
  eventSlug = route.params.eventSlug;
}

onMounted(async () => {
  // utilise la route pour récupérer le slug et le titre de l'évènement correspondant
  const event = eventStore.events.find((event) => event.slug === eventSlug);
  if (event) {
    eventTitle.value = event.title;
  }
  try {
    // fetch les données des participants selon le slug de l'evenement selectionné
    const participantsData: Participant[] = await fetchParticipantsData(eventSlug); 
    participants.value = participantsData;
    datasAreAvailable.value = true;
  } catch (error) {
    console.error('Erreur lors du chargement des participants :', error);
  }
});

</script>

<template>
    <div class="dashboardPage">
        <NavAside />
        <div class="page-content">
            <DashboardHeader title="Vos participants">
                <router-link to="/home">
                    <ReusablePrimaryButton>Retour aux évènements</ReusablePrimaryButton>
                </router-link>
            </DashboardHeader>
            <DataLoader v-if="!datasAreAvailable" class="dataLoader"/>
            <div class="content-field" v-else>
                <div class="content">
                    <ParticipantsBanner :title="eventTitle" :participants="participants"/>
                    <ParticipantsArray :participants="participants"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/dashboardPageStyle.scss';
.dataLoader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

</style>
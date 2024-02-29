<script setup lang="ts">

import { Icon } from '@iconify/vue';
import { useEventStore } from '@/stores/EventStore';
import { useGlobalDataStore } from '@/stores/GlobalDataStore';
import DashboardEventCardActions from './DashboardEventCardActions.vue';
import DashboardEventCardDateCard from './DashboardEventCardDateCard.vue';
import ReusablePrimaryButton from '@/sub-components/ReusablePrimaryButton.vue';
import { useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import type { Event } from '@/types/eventsTypes';

const eventStore = useEventStore();
const events: Event[] = eventStore.events;

const { hostName } = useGlobalDataStore();

const router = useRouter();

// permet de naviguer vers la page de l'evenement selectionné
const navigateToEvent = (eventSlug: string): void => {
    router.push({
      name: 'EventDetail',
      params: { eventSlug }
    });
};

// déclare currentFilter comme réactif avec valeur 'all' par défaut
const currentFilter = ref<{value: string}>({ value: 'all' });

// procède au filtrage des évènements 'à venir' / 'passés' / 'par mot-clé' selon la methode de eventStore et affiche tous les évènements par défaut
const filteredEvents = computed(() => {
    if (currentFilter.value.value === 'upcoming') {
        return eventStore.upcomingEvents;
    } else if (currentFilter.value.value === 'past') {
        return eventStore.pastEvents;
    } else if (currentFilter.value.value === 'keyword') {
        return eventStore.filteredByKeywordEvents;
    } else {
        return events;
    }
});

// permet de vérifier le nombre d'évènements correspondant au mot-clé
const filteredByKeywordEventsCount = computed(() => {
    return eventStore.filteredByKeywordEvents.length;
});

// écoute l'évènement personnalisé émis par DashboardEventsFilters et EventsSearchBar
onMounted(() => {
    window.addEventListener('filterChanged', handleFilterChanged);
});

// modifie la valeur du filtre selon l'evenement emis
const handleFilterChanged = (event: any) => {
    currentFilter.value = { value: event.detail };
};

// permet de réafficher tous les évènements suite à une recherche infructueuse
const displayAllEvents = (): void => {
    currentFilter.value = {value: 'all'};
    // emet un évènement personnalisé pour restaurer la class active 'all'
    window.dispatchEvent(new CustomEvent('filterChanged', { detail: 'all' }));
};

</script>

<template>
    <div class="dashboardEventCard" v-for="event in filteredEvents" :key="event.title">
        <div class="image_container" @click="navigateToEvent(event.slug)">
            <img :src="hostName + event.image.source" :alt="event.image.alt">
        </div>
        <div class="infos_container">
            <div class="location_container">
                <Icon icon="mdi:place-outline" class="location-icon"/>
                <p>{{ event.location }}</p>
            </div>
            <h1 class="eventTitle">{{ event.title }}</h1>
        </div>
        <DashboardEventCardActions class="actions" :slug="event.slug" :title="event.title" :id="event.id.toString()"/>
        <DashboardEventCardDateCard :date="new Date(event.date)" class="dateCard" />
    </div>
    <div class="noMatchFound_container" v-if="filteredByKeywordEventsCount === 0 && currentFilter.value === 'keyword'">
        <p class="noMatchFound">Aucun résultat pour votre recherche...</p> 
        <ReusablePrimaryButton @click="displayAllEvents">Retour à vos évènements</ReusablePrimaryButton>
    </div>    
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/colors.scss';
@import '@/assets/sass/variables.scss';
@import '@/assets/sass/breakPoints.scss';
.dashboardEventCard {
    width: 100%;
    height: 22rem;
    background: $whiteColor;
    border-radius: 0 $containerRadiusM 0 $containerRadiusXL;
    position: relative;
    .image_container {
        width: 100%;
        height: 50%;
        display: inline-block;
        position: relative;
        overflow: hidden;
        border-radius: 0 $containerRadiusM 0 0;

        img {
            width: 100%;
            height: 100%;
            display: block;
            position: relative;
            object-fit: cover;
            cursor: pointer;
            transition: transform .6s ease-in-out;

            &:hover {
                transform: scale(1.05);
            }
        }
    }
    .infos_container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        position: relative;
        .location_container {
            display: flex;
            align-items: center;
            gap: .2rem;
            p, .location-icon  {
            margin: 0;
            font-size: .9rem;
            font-weight: 500;
            color: $accentColorSecondary;
            }
        }
        .eventTitle {
            margin: 0;
            font-size: 1.1rem;
        }
    }

    .actions {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 1rem;
        display: flex;
        justify-content: flex-end;
        border-top: solid 1px $blackTransparency;
    }
    .dateCard {
        position: absolute;
        top: 0;
        right: 0;
    }
}
.noMatchFound_container {
    width: 100%;
    height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: $whiteColor;
}

@media screen and (min-width: $breakpointDesktop) {
    .dashboardEventCard .infos_container .eventTitle {
        font-size: 1.25rem;
    }
}  

</style>
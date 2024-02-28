<script setup lang="ts">

import { Icon } from '@iconify/vue';
import { useEventStore } from '@/stores/EventStore';
import { useGlobalDataStore } from '@/stores/GlobalDataStore';
import DashboardEventCardActions from './DashboardEventCardActions.vue';
import DashboardEventCardDateCard from './DashboardEventCardDateCard.vue';
import { useRouter } from 'vue-router';
//import { ref, computed } from 'vue';
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

/*
// déclare currentFilter comme réactif avec valeur 'all' par défaut
const currentFilter = ref({ value: 'all' });

// procède au filtrage des évènements 'à venir' / 'passés' / 'par mot-clé' selon la methode de eventStore et affiche tous les évènements par défaut
const filteredEvents = computed(() => {
    if (currentFilter.value.value === 'upcoming') {
        return eventStore.upcomingEvents;
    } else if (currentFilter.value.value === 'past') {
        return eventStore.pastEvents;
    } else if (currentFilter.value.value === 'keyword') {
        return eventStore.filteredByKeywordEvents;
    } else {
        return events
    }
});



// permet de naviguer vers la page de modification de l'évènement selectionné
const navigateToEventUpdatePage = (eventSlug: string): void => {
    router.push({
        name: 'EventToUpdate',
        params: { eventSlug }
    });
};

// permet de naviguer vers la page affichant la liste des participants à l'évènement sélectionné
const navigateToParticipantsList = (eventSlug: string): void => {
    router.push({
        name: 'ParticipantsList',
        params: { eventSlug }
    });
};

// ouvre la fenetre 'RemoveEventConfirmationModal' au clic de l'icone
const openRemoveEventConfirmationModal = (event: Event): void => {
    const eventDetail = { eventTitle: event.title, eventId: event.id };
    // crée un nouvel evenement personnalisé 
    const showRemoveEventConfirmationModalEvent = new CustomEvent('show-removeEventConfirmationModal', {
      detail: eventDetail,
    });
    // déclenche l'événement 'show-removeEventConfirmationModal' sur l'objet window
    window.dispatchEvent(showRemoveEventConfirmationModalEvent);
}
*/

/*
// permet de vérifier le nombre d'évènements correspondant au mot-clé
const filteredByKeywordEventsCount = computed(() => {
    return eventStore.filteredByKeywordEvents.length;
});

// permet de réafficher tous les évènements suite à une recherche infructueuse
const displayAllEvents = (): void => {
    currentFilter.value = {value:'all'};
    // emet un évènement personnalisé pour restaurer la class active 'all'
    window.dispatchEvent(new CustomEvent('filterChanged', { detail: 'all' }));
};

/*
// modifie la valeur du filtre selon l'evenement emis
const handleFilterChanged = (event: CustomEvent<{ value: string }>): void => {
    currentFilter.value = { value: event.detail.value};
};
*/

/*
// écoute l'évènement personnalisé émis par BackOfficeEventsNav et BackOfficeEventsSearchBar
onMounted(() => {
    window.addEventListener('filterChanged', handleFilterChanged);
});
*/

</script>

<template>
    <div class="dashboardEventCard" v-for="event in events" :key="event.title">
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
        <DashboardEventCardActions class="actions" :slug="event.slug"/>
        <DashboardEventCardDateCard :date="new Date(event.date)" class="dateCard" />
    </div>
    <!-- <div class="noMatchFound_container" v-if="filteredByKeywordEventsCount === 0 && currentFilter.value === 'keyword'">
        <p class="noMatchFound">Aucun résultat pour votre recherche...</p> 
        <button class="back_btn" @click="displayAllEvents">
            <p>Retour à vos évènements</p>
        </button>
    </div> -->
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/colors.scss';
@import '@/assets/sass/variables.scss';
@import '@/assets/sass/breakPoints.scss';
.dashboardEventCard {
    width: 100%;
    height: 22rem;
    background: $whiteColor;
    //color: $whiteColor;
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
    /*
    .noMatchFound_container {
      height: 75vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      .noMatchFound {
        margin: 0;
        font-size: 1.2rem;
      }
      .back_btn {
        background: transparent;
        //color: $darkColorBackOf;
        //border: 1px solid $darkColorBackOf;
        display: flex;
        justify-content: center;
        text-align: center;
        cursor: pointer;

        &:hover {
          //color: $accentColorBackof2;
          //border-color: $accentColorBackof2;
        }

        p {
          margin: 0;
          font-size: 1rem;
          font-weight: 700;
          padding: .5rem;
        }
      }
    } */

@media screen and (min-width: $breakpointDesktop) {
    .dashboardEventCard .infos_container .eventTitle {
        font-size: 1.25rem;
    }
}  

</style>
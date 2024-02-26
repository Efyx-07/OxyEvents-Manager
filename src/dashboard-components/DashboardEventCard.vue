<script setup lang="ts">

import { Icon } from '@iconify/vue';
import { useEventStore } from '@/stores/EventStore';
import { useGlobalDataStore } from '@/stores/GlobalDataStore';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import type { Event } from '@/types/eventsTypes';

const eventStore = useEventStore();
const events = eventStore.events;

const { hostName } = useGlobalDataStore();

const router = useRouter();

// reformate la date et sépare jour / mois / année
const formatDateDay = (date: string): string => {
    const dateObject = new Date(date);
    const day = dateObject.getDate().toString().padStart(2, '0');
    return day;
};
const formatDateMonth = (date: string): string => {
    const dateObject = new Date(date);
    const monthIndex = dateObject.getMonth();
    const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    return monthNames[monthIndex];
};
const formatDateYear = (date: string): string => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear().toString();
    return year;
};

// permet de naviguer vers la page de l'evenement selectionné
const navigateToEvent = (eventSlug: string): void => {
    router.push({
        name: 'EventDetail',
        params: { eventSlug }
    });
};

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
    <div class="noMatchFound_container" v-if="filteredByKeywordEventsCount === 0 && currentFilter.value === 'keyword'">
        <p class="noMatchFound">Aucun résultat pour votre recherche...</p> 
        <button class="back_btn" @click="displayAllEvents">
            <p>Retour à vos évènements</p>
        </button>
    </div>
    <div class="backOfficeEventCard" v-for="event in filteredEvents" :key="event.title" v-else>
        <div class="eventImage_container" @click="navigateToEvent(event.slug)">
            <img :src="hostName + event.image.source" :alt="event.image.alt" class="eventImage">
        </div>
        <div class="eventCard-titleAndActions_container">
            <div class="eventLocation_container">
                <Icon icon="mdi:place-outline" class="loc-icon"/>
                <p>{{ event.location }}</p>
            </div>
            <h1 class="eventTitle">{{ event.title }}</h1>
            <div class="actionIcons_container">
                <div class="icon_container">
                    <Icon icon="mdi:eye" class="icon" @click="navigateToEvent(event.slug)"/>
                </div>
                <div class="icon_container">
                    <Icon icon="ic:baseline-edit" class="icon" @click="navigateToEventUpdatePage(event.slug)"/>
                </div>
                <div class="icon_container">
                    <Icon icon="heroicons:users-solid" class="icon" @click="navigateToParticipantsList(event.slug)"/>
                </div>
                <div class="icon_container">
                    <Icon icon="mdi:trash" class="icon" @click="openRemoveEventConfirmationModal(event)"/>
                </div> 
            </div>
        </div>
        <div class="dateCard">
            <p class="dateCard-day"> {{ formatDateDay(event.date.toString()) }} </p>
            <div class="monthYear_container">
                <p class="dateCard-month"> {{ formatDateMonth(event.date.toString()) }} </p>
                <p class="dateCard-year"> {{ formatDateYear(event.date.toString()) }} </p>
            </div> 
        </div>
    </div>
</template>

<style lang="scss" scoped>

    @import '@/assets/sass/dashboard-styles/colors.scss';
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
    .backOfficeEventCard {
        width: 100%;
        height: 22rem;
        background: $whiteColor;
        box-shadow: $containerShadow;
        //border-radius: $containerRadius 0 $containerRadius 0;
        position: relative;
        .eventImage_container {
            width: 100%;
            height: 50%;
            display: inline-block;
            position: relative;
            overflow: hidden;
            //border-radius: $containerRadius 0 0 0;
            .eventImage {
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
        .eventCard-titleAndActions_container {
            display: flex;
            flex-direction: column;
            gap: .5rem;
            padding: 0 1rem;
            .eventLocation_container {
              display: flex;
              align-items: center;
              gap: .2rem;
              p, .loc-icon  {
                margin: 0;
                font-size: .9rem;
                font-weight: 500;
                color: $accentColorSecondary;
              }
            }
            .eventTitle {
              margin: 0;
              font-size: 1.25rem;
            }
            .actionIcons_container {
                display: flex;
                gap: 1.5rem;
                position: absolute;
                right: 1rem;
                bottom: 1rem;
                .icon_container {
                    .icon {
                        font-size: 1.5rem;
                        cursor: pointer;

                        &:hover {
                            color: $accentColorPrimary;
                        }
                    }

                }
            }
        }
        .dateCard {
          background: rgba($whiteColor, .8);
          border-radius: 10px 0;
          display: flex;
          align-items: center;
          gap:.2rem;
          position: absolute;
          top: .5rem;
          right: .5rem;
          padding: .3rem;

          p {
            margin: 0;
          }
          .dateCard-day {
            font-size: 2rem;
          }
          .monthYear_container {
            display: flex;
            flex-direction: column;
            line-height: 1;
            .dateCard-month {
              font-size: .8rem;
            }
            .dateCard-year {
              font-size: .9rem;
            }

          }
        }
    }
    
</style>
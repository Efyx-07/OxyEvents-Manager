<script setup lang="ts">

import { Icon } from '@iconify/vue';
import { useEventStore } from '@/stores/EventStore';
import { useGlobalDataStore } from '@/stores/GlobalDataStore';
  //import { useRouter } from 'vue-router';
  //import { ref, computed, onMounted } from 'vue';

const eventStore = useEventStore();
const events = eventStore.events;

const { hostName } = useGlobalDataStore();

 // const router = useRouter();

/*
  // reformate la date et sépare jour / mois / année
  const formatDateDay = (date) => {
      const options = { day: 'numeric' };
      return new Date(date).toLocaleDateString('fr-FR', options);
  };
  const formatDateMonth = (date) => {
      const options = { month: 'short' };
      return new Date(date).toLocaleDateString('fr-FR', options);
  };
  const formatDateYear = (date) => {
      const options = { year: 'numeric' };
      return new Date(date).toLocaleDateString('fr-FR', options);
  };

  // permet de naviguer vers la page de l'evenement selectionné
  const navigateToEvent = (eventSlug) => {
    router.push({
      name: 'EventDetail',
      params: { eventSlug }
    });
  };

  // permet de naviguer vers la page de modification de l'évènement selectionné
  const navigateToEventUpdatePage = (eventSlug) => {
    router.push({
      name: 'EventToUpdate',
      params: { eventSlug }
    });
  };

  // permet de naviguer vers la page affichant la liste des participants à l'évènement sélectionné
  const navigateToParticipantsList = (eventSlug) => {
    router.push({
      name: 'ParticipantsList',
      params: { eventSlug }
    });
  };

  // ouvre la fenetre 'RemoveEventConfirmationModal' au clic de l'icone
  const openRemoveEventConfirmationModal = (event) => {
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

  // écoute l'évènement personnalisé émis par BackOfficeEventsNav et BackOfficeEventsSearchBar
  onMounted(() => {
    window.addEventListener('filterChanged', handleFilterChanged);
  });

  // modifie la valeur du filtre selon l'evenement emis
  const handleFilterChanged = (event) => {
    currentFilter.value = { value: event.detail };
  };

  // permet de réafficher tous les évènements suite à une recherche infructueuse
  const displayAllEvents = () => {
    currentFilter.value = 'all';
    // emet un évènement personnalisé pour restaurer la class active 'all'
    window.dispatchEvent(new CustomEvent('filterChanged', { detail: 'all' }));
  };
*/
</script>

<template>
    <!-- <div class="noMatchFound_container" v-if="filteredByKeywordEventsCount === 0 && currentFilter.value === 'keyword'">
        <p class="noMatchFound">Aucun résultat pour votre recherche...</p> 
        <button class="back_btn" @click="displayAllEvents">
            <p>Retour à vos évènements</p>
        </button>
    </div> -->
    <div class="backOfficeEventCard" v-for="event in events" :key="event.title">
        <div class="eventImage_container">
            <img :src="hostName + event.image.source" :alt="event.image.alt" class="eventImage">
        </div>
        <div class="eventCard-titleAndActions_container">
            <div class="eventLocation_container">
                <Icon icon="mdi:place-outline" class="loc-icon"/>
                <p>{{ event.location }}</p>
            </div>
            <h1 class="eventTitle">{{ event.title }}</h1>
            <!-- <div class="actionIcons_container">
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
            </div> -->
        </div>
        <!-- <div class="dateCard">
            <p class="dateCard-day"> {{ formatDateDay(event.date) }} </p>
            <div class="monthYear_container">
                <p class="dateCard-month"> {{ formatDateMonth(event.date) }} </p>
                <p class="dateCard-year"> {{ formatDateYear(event.date) }} </p>
            </div> 
        </div> -->
    </div> 
</template>
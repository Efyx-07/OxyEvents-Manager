<script setup lang="ts">

import { useEventStore } from '@/stores/EventStore';
import { computed, ref, onMounted } from 'vue';

const eventStore = useEventStore();

// récupère le nombre d'évènements total
const eventsCount = computed<number>(() => {
    return eventStore.events.length;
});

// récupère le nombre d'évènements 'à venir'
const upcomingEventsCount = computed<number>(() => {
    return eventStore.upcomingEvents.length;
});

// récupère le nombre d'évènements 'passés'
const pastEventsCount = computed<number>(() => {
    return eventStore.pastEvents.length;
});

// déclare currentFilter comme réactif avec valeur 'all' par défaut
const currentFilter = ref<string>('all');

// fonctions emettant les évènements personnalisés
const displayAllEvents = (): void => {
    currentFilter.value = 'all';
    window.dispatchEvent(new CustomEvent('filterChanged', { detail: 'all' }));
};

const displayOnlyUpcomingEvents = (): void => {
    currentFilter.value = 'upcoming';
    window.dispatchEvent(new CustomEvent('filterChanged', { detail: 'upcoming' }));
};

const displayOnlyPastEvents = (): void => {
    currentFilter.value = 'past';
    window.dispatchEvent(new CustomEvent('filterChanged', { detail: 'past' }));
};

// écoute l'évènement personnalisé émis par BackOfficeEventsSearchBar
onMounted(() => {
    window.addEventListener('filterChanged', handleFilterChanged);
    window.addEventListener('resetActiveTabs', resetActiveTabs);
});

// modifie la valeur du filtre selon l'evenement emis
const handleFilterChanged = (event: any) => {
    currentFilter.value = event.detail;
};

// réinitialise les classes actives
const resetActiveTabs = () => {
    currentFilter.value = '';
};

</script>

<template>
    <div id="eventsNav" class="boHeaderNav" v-if="eventsCount >= 1">
        <!-- <SearchIcon class="searchIcon" /> -->
        <div class="navItem" @click="displayAllEvents" :class="{ 'active-link': currentFilter === 'all' }">
            <p>Tous <span>({{ eventsCount }})</span></p>
            <div class="activeBar"></div>
        </div>
        <div class="navItem" @click="displayOnlyUpcomingEvents" :class="{ 'active-link': currentFilter === 'upcoming' }">
            <p>A venir <span>({{ upcomingEventsCount }})</span></p>
            <div class="activeBar"></div>
        </div>
        <div class="navItem" @click="displayOnlyPastEvents" :class="{ 'active-link': currentFilter === 'past' }">
            <p>Passés <span>({{ pastEventsCount }})</span></p>
            <div class="activeBar"></div>
        </div>
    </div>
</template>
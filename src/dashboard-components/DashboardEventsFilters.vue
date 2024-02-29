<script setup lang="ts">

import { useEventStore } from '@/stores/EventStore';
import { computed, ref, onMounted } from 'vue';
import SearchIcon from '@/sub-components/SearchIcon.vue';

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

// crée une interface de type pour FilterItem
interface FilterItem {
    name: string;
    clickAction: Function;
    currentFilter: string;
    count: number;
};

// datas des filterItems
const filterItems: FilterItem[] = [

    {
        name: 'Tous',
        clickAction: () => displayAllEvents(),
        currentFilter: 'all',
        count: eventsCount.value,
    },

    {
        name: 'A venir',
        clickAction: () => displayOnlyUpcomingEvents(),
        currentFilter: 'upcoming',
        count: upcomingEventsCount.value,
    },

    {
        name: 'Passés',
        clickAction: () => displayOnlyPastEvents(),
        currentFilter: 'past',
        count: pastEventsCount.value,
    }
]

</script>

<template>
    <div class="eventsFilters-container" v-if="eventsCount >= 1">
        <div class="searchIcon-container">
            <SearchIcon />
        </div>
        <div class="filterItems-container">
            <div class="filterItem" v-for="filterItem in filterItems" :key="filterItem.name" @click="filterItem.clickAction" :class="{ 'active-link': currentFilter === filterItem.currentFilter }">
                <p>{{ filterItem.name }} <span>({{ filterItem.count }})</span></p>
                <div class="activeBar"></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/colors.scss';
@import '@/assets/sass/variables.scss';
@import '@/assets/sass/breakPoints.scss';
.eventsFilters-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    .filterItems-container {
        width: 100%;
        border: solid 1px $whiteTransparency;
        border-radius: $containerRadius * 2;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: .5rem 2rem;
        align-items: center;
        .filterItem {
            cursor: pointer;

            &.active-link {
                color: $accentColorPrimary;
            }
            
            p {
                margin: 0;
                
                &:hover {
                    color: $accentColorPrimary;
                }
            }
        }
    }
}

@media screen and (min-width: $breakpointDesktop) {
    .eventsFilters-container {
        gap: 2rem;

        .filterItems-container {
            gap: 5rem;
        }
    }
}

</style>
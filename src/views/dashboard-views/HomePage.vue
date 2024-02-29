<script setup lang="ts">

import NavAside from '@/dashboard-components/NavAside.vue';
import DashboardHeader from '@/dashboard-components/DashboardHeader.vue';
import DashboardEventCard from '@/dashboard-components/DashboardEventCard.vue';
import RemoveEventConfirmationModal from '@/dashboard-modals/RemoveEventConfirmationModal.vue';
import DashboardEventsFilters from '@/dashboard-components/DashboardEventsFilters.vue';
import EventsSearchBar from '@/dashboard-components/EventsSearchBar.vue';
import ReusablePrimaryButton from '@/sub-components/ReusablePrimaryButton.vue';
import { Icon } from '@iconify/vue';
import { useEventStore } from '@/stores/EventStore';
import { computed } from 'vue';

const eventStore = useEventStore();

// permet de vérifier le nombre d'évènements créés
const eventsCount = computed<number>(() => {
    return eventStore.events.length;
});

</script>

<template>
    <div class="dashboardPage">
        <NavAside />
        <div class="page-content">
            <DashboardHeader title="Vos évènements">
                <DashboardEventsFilters />
            </DashboardHeader>
            <div class="content-field">
                <div class="eventCards_container">
                    <DashboardEventCard />
                </div>
                <div v-if="eventsCount === 0" class="no-events">
                    <p>Il n'y a aucun évènement pour l'instant...</p>
                    <Icon icon="streamline-emojis:magnifying-glass-tilted-left"  class="icon"/>
                    <router-link to="/event-create">
                        <ReusablePrimaryButton>Créez votre 1er évènement</ReusablePrimaryButton>
                    </router-link>
                </div>
            </div>
            <EventsSearchBar class="eventsSearchBar"/>
        </div>
    </div>
    <RemoveEventConfirmationModal />
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/dashboardPageStyle.scss';
@import '@/assets/sass/dashboard-styles/colors.scss';

.eventCards_container {
    display: flex;
    gap: 2rem;
    justify-content: center;
    flex-wrap: wrap;
}
.eventsSearchBar {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 198;
}
.no-events {
    width: 100%;
    height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    p {
        margin: 0;
        color: $whiteColor; 
    }
    .icon {
        font-size: 6rem;
    }
}

</style>
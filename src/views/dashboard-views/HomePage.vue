<script setup lang="ts">

import NavAside from '@/dashboard-components/NavAside.vue';
import DashboardHeader from '@/dashboard-components/DashboardHeader.vue';
import DashboardEventCard from '@/dashboard-components/DashboardEventCard.vue';
import RemoveEventConfirmationModal from '@/dashboard-modals/RemoveEventConfirmationModal.vue';
import DashboardEventsFilters from '@/dashboard-components/DashboardEventsFilters.vue';

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
            </div>
        </div>
    </div>
    <RemoveEventConfirmationModal />
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/dashboardPageStyle.scss';

.eventCards_container {
    display: flex;
    gap: 2rem;
    justify-content: center;
    flex-wrap: wrap;
}

</style>
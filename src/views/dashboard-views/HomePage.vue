<script setup lang="ts">

import NavAside from '@/dashboard-components/NavAside.vue';
import DashboardHeader from '@/dashboard-components/DashboardHeader.vue';
import DB_EventCard from '@/dashboard-components/DB_EventCard.vue';

</script>

<template>
    <div class="dashboardPage">
        <NavAside />
        <div class="page-content">
            <DashboardHeader title="Vos évènements">
                <button>Je suis un bouton</button>
            </DashboardHeader>
            <div class="eventCards_container">
                <DB_EventCard />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/dashboardPageStyle.scss';

</style>
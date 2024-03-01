<script setup lang="ts">

import NavAside from '@/dashboard-components/NavAside.vue';
import DashboardHeader from '@/dashboard-components/DashboardHeader.vue';
import ReusablePrimaryButton from '@/sub-components/ReusablePrimaryButton.vue';

</script>

<template>
    <div class="dashboardPage">
        <NavAside />
        <div class="page-content">
            <DashboardHeader title="Nouvel évènement">
                <router-link to="/home">
                    <ReusablePrimaryButton>Retour aux évènements</ReusablePrimaryButton>
                </router-link>
            </DashboardHeader>
        </div>
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/dashboardPageStyle.scss';

</style>
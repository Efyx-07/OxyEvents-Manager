<script setup lang="ts">

import NavAside from '@/dashboard-components/NavAside.vue';
import DashboardHeader from '@/dashboard-components/DashboardHeader.vue';
import ReusablePrimaryButton from '@/sub-components/ReusablePrimaryButton.vue';
import AdminFormContainer from '@/dashboard-components/AdminFormContainer.vue';
import EventFormCreate from '@/dashboard-forms/EventFormCreate.vue';

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
            <div class="content-field">
                <AdminFormContainer title="Créer un nouvel évènement">
                    <EventFormCreate />
                </AdminFormContainer>
            </div>
        </div>
    </div>
</template>

<style scope lang="scss">

@import '@/assets/sass/dashboard-styles/dashboardPageStyle.scss';

</style>
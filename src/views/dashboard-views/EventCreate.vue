<script setup lang="ts">

import NavAside from '@/dashboard-components/NavAside.vue';
import DashboardHeader from '@/dashboard-components/DashboardHeader.vue';
import ReusablePrimaryButton from '@/sub-components/ReusablePrimaryButton.vue';
import AdminFormContainer from '@/dashboard-components/AdminFormContainer.vue';
import EventFormCreate from '@/dashboard-forms/EventFormCreate.vue';
import DataLoader from '@/sub-components/DataLoader.vue';
import { ref } from 'vue';

// affiche le loader et le cache après 0.5s
const contentIsVisible = ref<boolean>(false);

setTimeout(() => {
    contentIsVisible.value = true;
}, 500);

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
            <DataLoader v-if="!contentIsVisible" class="dataLoader"/>
            <div class="content-field" v-else>
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
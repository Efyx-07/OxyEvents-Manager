<script setup lang="ts">

import NavAside from '@/dashboard-components/NavAside.vue';
import DashboardHeader from '@/dashboard-components/DashboardHeader.vue';
import AdminPageNav from '@/dashboard-components/AdminPageNav.vue';
import AdminFormContainer from '@/dashboard-components/AdminFormContainer.vue';
import AdminFormUpdatePassword from '@/dashboard-forms/AdminFormUpdatePassword.vue';
import DataLoader from '@/sub-components/DataLoader.vue';
import { ref } from 'vue';
import { useGlobalDataStore } from '@/stores/GlobalDataStore';

const { dataLoaderDelay } = useGlobalDataStore();

// affiche le loader et le cache selon dataLoaderDelay defini dans GlobalDataStore
const contentIsVisible = ref<boolean>(false);

setTimeout(() => {
    contentIsVisible.value = true;
}, dataLoaderDelay);

</script>

<template>
    <div class="dashboardPage">
        <NavAside />
        <div class="page-content">
            <DashboardHeader title="Gestion compte administrateur">
                <AdminPageNav />
            </DashboardHeader>
            <DataLoader v-if="!contentIsVisible" class="dataLoader"/>
            <div class="content-field" v-else>
                <AdminFormContainer title="Modifier votre mot de passe">
                    <AdminFormUpdatePassword />
                </AdminFormContainer>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/dashboardPageStyle.scss';

</style>
<script setup lang="ts">

import NavAside from '@/dashboard-components/NavAside.vue';
import DashboardHeader from '@/dashboard-components/DashboardHeader.vue';

import { useAdminStore } from '@/stores/AdminStore';

const adminStore = useAdminStore();
const adminStatus: "SUPERADMIN" | "ADMIN" | "GENERIC" | "GUEST" = adminStore.adminData.status

</script>

<template>
    <div class="dashboardPage">
        <NavAside />
        <div class="page-content">
            <DashboardHeader title="JE SUIS LE TITRE DE LA HOMEPAGE">
                <button>Je suis un bouton</button>
            </DashboardHeader>
            <h1>{{ adminStatus }}</h1>
        </div>
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/dashboardPageStyle.scss';

</style>
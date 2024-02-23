<script setup lang="ts">

import NavAside from '@/dashboard-components/NavAside.vue';
import DashboardHeader from '@/dashboard-components/DashboardHeader.vue';
import AdminPageNav from '@/dashboard-components/AdminPageNav.vue';
import AdminFormContainer from '@/dashboard-components/AdminFormContainer.vue';
import AdminFormUpdatePasswordVue from '@/dashboard-forms/AdminFormUpdatePassword.vue';

</script>

<template>
    <div class="dashboardPage">
        <NavAside />
        <div class="page-content">
            <DashboardHeader title="Gestion compte administrateur">
                <AdminPageNav />
            </DashboardHeader>
            <AdminFormContainer title="Modifier votre mot de passe">
                <AdminFormUpdatePasswordVue />
            </AdminFormContainer>
        </div>
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/dashboardPageStyle.scss';

</style>
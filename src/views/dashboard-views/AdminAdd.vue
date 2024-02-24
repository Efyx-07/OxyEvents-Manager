<script setup lang="ts">

import NavAside from '@/dashboard-components/NavAside.vue';
import DashboardHeader from '@/dashboard-components/DashboardHeader.vue';
import AdminPageNav from '@/dashboard-components/AdminPageNav.vue';
import AdminFormContainer from '@/dashboard-components/AdminFormContainer.vue';
import AdminFormInvitNewAdmin from '@/dashboard-forms/AdminFormInvitNewAdmin.vue';

</script>

<template>
    <div class="dashboardPage">
        <NavAside />
        <div class="page-content">
            <DashboardHeader title="Gestion compte administrateur">
                <AdminPageNav />
            </DashboardHeader>
            <AdminFormContainer title="Ajouter un nouvel administrateur">
                <div class="aboutNotification">
                    <p>
                        Notification: Pour créer un nouvel administrateur, renseignez son email. Celui-ci recevra une invitation lui permettant de créer son compte. Le nouvel administrateur sera ajouté dès son compte créé. Il aura accès à toutes les fonctionnalités sauf l'ajout ou la suppression d'autres administrateurs, droits dont vous seul bénéficiez.
                    </p>
                </div>
                <AdminFormInvitNewAdmin />
            </AdminFormContainer>
        </div>
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/dashboardPageStyle.scss';
@import '@/assets/sass/dashboard-styles/colors.scss';

.aboutNotification {
    border: solid 1px $blackTransparency;
    padding: 1rem;

    p {
        margin: 0;
        font-size: .75rem;
        font-weight: 600;
    }
}

</style>
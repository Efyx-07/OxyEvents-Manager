<script setup lang="ts">

import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';
import NavAside from '@/dashboard-components/NavAside.vue';
import ReusablePrimaryButton from '@/sub-components/ReusablePrimaryButton.vue';

const router = useRouter();

// reconduis vers la page 'vos évènements'
const navigateToHomepage = (): void => {
    router.push('/home');
};

</script>

<template>
    <div class="dashboardPage">
        <NavAside />
        <div class="page-content">
            <div class="confirmation_content">
                <p>Désolé, vous ne disposez pas des droits nécessaires pour accéder à cette partie du site.</p>
                <Icon icon="streamline-emojis:cross-mark" class="icon"/>
                <ReusablePrimaryButton @click="navigateToHomepage">Retour aux évènements</ReusablePrimaryButton>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/dashboardPageStyle.scss';
@import '@/assets/sass/dashboard-styles/confirmPageStyle.scss';
      
</style>
<script setup lang="ts">

import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';
import NavAside from '@/dashboard-components/NavAside.vue';
import ReusablePrimaryButton from '@/sub-components/ReusablePrimaryButton.vue';

const router = useRouter();

// reconduis vers la page 'vos évènements'
const navigateToHomepage = () => {
    router.push('/home');
};

</script>

<template>
    <div class="dashboardPage">
        <NavAside />
        <div class="page-content">
            <div class="confirmation_content">
                <p>Bravo, votre évènement a été supprimé avec succès !</p>
                <Icon icon="streamline-emojis:ok-hand-2" class="icon"/>
                <ReusablePrimaryButton @click="navigateToHomepage">Retour aux évènements</ReusablePrimaryButton>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/dashboardPageStyle.scss';
@import '@/assets/sass/dashboard-styles/confirmPagestyle.scss';
      
</style>


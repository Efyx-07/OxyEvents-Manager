<script setup lang="ts">

import { Icon } from '@iconify/vue';

// ouvre la fenetre 'BackOfficeNavMobile' au clic de l'icone
const toggleBackOfficeNavMobileVisibility = (): void => {
    // crée un nouvel evenement personnalisé 
    const showBackOfficeNavMobileEvent = new Event('show-backOfficeNavMobile');
    // déclenche l'événement 'show-backOfficeNavMobile' sur l'objet window
    window.dispatchEvent(showBackOfficeNavMobileEvent);
}

</script>

<template>

    <Icon icon="tabler:menu-deep" class="mobileMenuIcon" @click="toggleBackOfficeNavMobileVisibility"/>

</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/colors.scss';
@import '@/assets/sass/breakPoints.scss';
    .mobileMenuIcon {
        font-size: 1.5rem;
        color: $whiteColor;
        cursor: pointer;

        &:hover {
            color: $accentColorPrimary;
        }
    }

    @media screen and (min-width: $breakpointDesktop) {
        .mobileMenuIcon {
            display: none;
        }
    }

</style>
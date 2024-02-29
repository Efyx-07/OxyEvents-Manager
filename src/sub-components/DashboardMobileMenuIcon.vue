<script setup lang="ts">

import { Icon } from '@iconify/vue';

// ouvre la fenetre 'NavAside' au clic de l'icone
const toggleNavAsideVisibility = (): void => {
    // crée un nouvel evenement personnalisé 
    const showNavAsideEvent = new Event('show-navAside');
    // déclenche l'événement 'show-navAside' sur l'objet window
    window.dispatchEvent(showNavAsideEvent);
}

</script>

<template>

    <Icon icon="tabler:menu-deep" class="mobileMenuIcon" @click="toggleNavAsideVisibility"/>

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
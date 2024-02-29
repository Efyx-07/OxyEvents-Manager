<script setup lang="ts">

import { Icon } from '@iconify/vue';

// ouvre la fenetre 'EventsSearchbar' au clic de l'icone
const revealEventsSearchBar = (): void => {
    // crée un nouvel evenement personnalisé 
    const showEventsSearchBarEvent: Event = new Event('show-eventsSearchBar');
    // déclenche l'événement 'show-eventsSearchBar' sur l'objet window
    window.dispatchEvent(showEventsSearchBarEvent);
};

</script>

<template>
    <div class="searchIcon_container" @click="revealEventsSearchBar">
        <Icon icon="ic:sharp-search" class="searchIcon" />
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/colors.scss';
@import '@/assets/sass/breakPoints.scss';
.searchIcon_container {
    width: 2rem;
    height: 2rem;
    background: $accentColorSecondary;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        background: $accentColorSecondaryLighted;
    }
    .searchIcon {
        color: $whiteColor;
        font-size: 1.3rem;
    }
}

@media screen and (min-width: $breakpointDesktop) {
    .searchIcon_container {
        width: 2.3rem;
        height: 2.3rem;
    }
}

</style>
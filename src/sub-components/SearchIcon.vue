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
    width: 2.5rem;
    height: 2.5rem;
    border: solid 1px $whiteTransparency;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        background: $accentColorPrimary;
    }
    .searchIcon {
        color: $whiteColor;
        font-size: 1.5rem;
    }
}

</style>
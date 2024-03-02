<script setup lang="ts">
import type { Event } from '@/types/eventsTypes';
import { useGlobalDataStore } from '@/stores/GlobalDataStore';

// recupère la props de selectedEvent en provenance de EventPage
const props = defineProps<{
    selectedEvent: Event;
}>();

const { hostName } = useGlobalDataStore();

</script>

<template>
    <div class="organizerLogo_container">
        <a :href="props.selectedEvent.organizerWebsite" target="_blank" rel="noopener noreferrer">
            <img class="organizerLogo" :src="hostName + props.selectedEvent.organizerLogo.source">
        </a>
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/breakPoints.scss';

.organizerLogo_container {
    width: 100%;
    height: 2.5rem;
    display: inline-block;
    position: relative;
    overflow: hidden;

    .organizerLogo {
        max-width: 100%;
        height: 100%;
        display: block;
        position: relative;
        object-fit: contain;
    }
}

@media screen and (min-width: $breakpointDesktop) {
    
    .organizerLogo_container {
        height: 4rem;
    }
}
    
</style>
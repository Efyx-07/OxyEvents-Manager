<script setup lang="ts">
import type { Event } from '@/types/eventsTypes';
import EventPageOrganizerLogo from '@/eventPage-subComponents/EventPageOrganizerLogo.vue';
import EventPageNav from '@/eventPage-subComponents/EventPageNav.vue';

// recupère la props de selectedEvent en provenance de EventPage
const props = defineProps<{
    selectedEvent: Event;
}>();

</script>

<template>
    <div class="header">
        <div class="content">
            <EventPageOrganizerLogo v-bind="props"/>
            <EventPageNav class="eventPageNav"/>
        </div>   
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/eventPage-styles/colors.scss';
@import '@/assets/sass/breakPoints.scss';

.header {
    width: 100%;
    height: 3.5rem;
    background: $whiteColor;
    box-shadow: $shadow;
    display: flex;
    justify-content: center;
    position: sticky;
    top: 0;
    z-index: 199;

    .content {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 1rem;

        .eventPageNav {
            display: none;
        }
    }       
}

@media screen and (min-width: $breakpointDesktop) {

    .header {
        position: unset;
        height: 5rem;

        .content {
            max-width: 77rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            padding: 0 1rem;

            .eventPageNav {
                display: flex;
            }
        }       
    }
}
    
</style>


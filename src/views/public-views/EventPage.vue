<script setup lang="ts">

import { useEventStore } from '@/stores/EventStore';
import { useRoute } from 'vue-router';
import type { Event } from '@/types/eventsTypes';

const eventStore = useEventStore();
const route = useRoute();

const allEvents: Event[] = eventStore.events;

// récupère le slug de la route
const eventSlug: string | string[] = route.params.eventSlug; 

// compare pour faire correspondre les slugs
const selectedEvent: Event | undefined = allEvents.find((event) => {
    return event.slug === eventSlug;
});


</script>

<template>
    <div class="eventPage">
        <EP_Header :selectedEvent="selectedEvent"/>
        <div class="eventPage_content">
            <div class="eventCard_container" ref="eventCard">
                <EP_EventCard :selectedEvent="selectedEvent" />
            </div>
            <div class="eventPage-sections_container">
                <div id="presentation">
                    <EP_Section_presentation :selectedEvent="selectedEvent"/>
                </div>
                <div id="programme">
                    <EP_Section_programme :selectedEvent="selectedEvent"/>
                </div>
                <div id="practicalInformations">
                    <EP_Section_practicalInformations :selectedEvent="selectedEvent"/>
                </div>
            </div>
        </div>
        <EP_Footer />
        <div class="stickyBarContainer">
            <EP_StickyBar :selectedEvent="selectedEvent"/>
        </div>
    </div>
    <EP_Modal_participantsInscription :selectedEvent="selectedEvent"/>   
</template>

<style lang="scss" scoped>

@import '@/assets/sass/breakPoints.scss';
@import '@/assets/sass/eventPage-styles/colors.scss';

.eventPage {
    background: $whiteBackground;
    color: $blackColor;
    display: flex;
    flex-direction: column;
    align-items: center;

    &_content {
        width: 100%;
        max-width: 77rem;
        display: flex;
        flex-direction: column;
        .eventPage-sections_container {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            padding: 3rem 1rem 6rem 1rem;
        }
    }
    .stickyBarContainer {
        display: none;
    }
}
@media screen and (min-width: $breakpointDesktop) {
    .eventPage {
        padding: 0;
        position: relative;

        &_content {
            padding: 0 1rem;
            .eventPage-sections_container {
                padding: 3rem 0rem 6rem 0rem;
            }
        }
        .stickyBarContainer {
            display: block;
            position: fixed;
            width: 100%;
            display: flex;
            justify-content: center;
        }
    }
}
       
</style>
<script setup lang="ts">

import { useEventStore } from '@/stores/EventStore';
import { useRoute } from 'vue-router';
import type { Event } from '@/types/eventsTypes';
import EventPageHeader from '@/eventPage-components/EventPageHeader.vue';
import EventPageFooter from '@/eventPage-components/EventPageFooter.vue';
import EventCard from '@/eventPage-components/EventCard.vue';
import SectionPresentation from '@/eventPage-components/SectionPresentation.vue';
import SectionProgramme from '@/eventPage-components/SectionProgramme.vue';
import SectionPracticalInformations from '@/eventPage-components/SectionPracticalInformations.vue';
import EventStickyCard from '@/eventPage-components/EventStickyCard.vue';
import WaveBackground from '@/eventPage-subComponents/WaveBackground.vue';

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
    <div class="eventPage" v-if="selectedEvent">
        <div class="bgDecoElement"></div>
        <EventPageHeader :selectedEvent="selectedEvent"/>
        <div class="eventPage_content">
            <div class="eventCard_container">
                <EventCard :selectedEvent="selectedEvent" />
            </div>
            <div class="content-container">
                <div class="eventPage-sections_container">
                    <div id="presentation">
                        <SectionPresentation :selectedEvent="selectedEvent"/>
                    </div>
                    <div id="programme">
                        <SectionProgramme :selectedEvent="selectedEvent"/>
                    </div>
                    <div id="practicalInformations">
                        <SectionPracticalInformations :selectedEvent="selectedEvent"/>
                    </div>
                </div>
                <div class="side-container">
                    <EventStickyCard :selectedEvent="selectedEvent"/>
                </div>
            </div>
        </div>
        <EventPageFooter />
        <WaveBackground class="waveBg"/>
    </div> 
</template>

<style lang="scss" scoped>

@import '@/assets/sass/breakPoints.scss';
@import '@/assets/sass/eventPage-styles/colors.scss';

.eventPage {
    background: $whiteColor;
    color: $blackColor;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .bgDecoElement {
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 0;
        background: $accentColorSecondaryTransparency;
        border-radius: 100% 0 0 0;
        transform: translateY(-6rem);
    }

    .waveBg {
        position: absolute;
        bottom: 0;
        z-index: 0;
    }

    &_content {
        width: 100%;
        max-width: 77rem;
        display: flex;
        flex-direction: column;
        padding: 3rem 1rem;
        z-index: 1;

        .eventCard_container {
            height: calc(100vh - 6.5rem);
            display: flex;
        }

        .content-container {

            .eventPage-sections_container {
                display: flex;
                flex-direction: column;
                gap: 2rem;
                padding-bottom: 6rem;
            } 

            .side-container {
                display: none;
            }
        }
    }
}

@media screen and (min-width: $breakpointDesktop) {

    .eventPage {
        background: $whiteColor;
        color: $blackColor;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

        .bgDecoElement {
            width: 37%;
            height: 100vh;
            position: absolute;
            top: 0;
            right: 0;
            z-index: 0;
            background: $accentColorSecondaryTransparency;
            border-radius: 100% 0 0 0;
            transform: translateY(-6rem);
        }

        .waveBg {
            position: absolute;
            bottom: 0;
            z-index: 0;
        }

        &_content {
            width: 100%;
            max-width: 77rem;
            display: flex;
            flex-direction: column;
            padding: 3rem 2rem;
            z-index: 1;

            .eventCard_container {
                height: calc(100vh - 6.5rem);
                display: flex;
            }

            .content-container {
                display: grid;
                grid-template-columns: 2fr 1fr;
                gap: 6rem;

                .eventPage-sections_container {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                    padding: 0 1rem 6rem 1rem;
                } 

                .side-container {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}

@media screen and (min-width: $breakpointLargeDesktop) {

    .eventPage { 

        .bgDecoElement {
            transform: translateY(-12rem);
        }
        .eventPage_content {
            padding: 6rem 0;

            .eventCard_container {
                height: calc(100vh - 15rem);
            }
        }
    }
}

</style>
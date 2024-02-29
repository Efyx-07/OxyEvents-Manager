<script setup lang="ts">

import NavAside from '@/dashboard-components/NavAside.vue';
import DashboardHeader from '@/dashboard-components/DashboardHeader.vue';
import ReusablePrimaryButton from '@/sub-components/ReusablePrimaryButton.vue';
import AdminFormContainer from '@/dashboard-components/AdminFormContainer.vue';
import EventFormUpdate from '@/dashboard-forms/EventFormUpdate.vue';
import { useEventStore } from '@/stores/EventStore';
import { useGlobalDataStore } from '@/stores/GlobalDataStore';
import { useRoute, useRouter } from 'vue-router';
import type { Event } from '@/types/eventsTypes';

const eventStore = useEventStore();
const route = useRoute();
const { hostName } = useGlobalDataStore();

const allEvents: Event[] = eventStore.events;

const eventSlug: string | string[] = route.params.eventSlug; // récupère le slug de la route

// compare pour faire correspondre les slugs
const selectedEvent: Event | undefined = allEvents.find((event) => {
    return event.slug === eventSlug;
});

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
            <DashboardHeader title="Modifier votre évènement">
                <ReusablePrimaryButton @click="navigateToHomepage">Retour aux évènements</ReusablePrimaryButton>
            </DashboardHeader>
            <div class="content-field">
                <AdminFormContainer title="Modifier les données de l'évènement" v-if="selectedEvent">
                    <div class="eventImageAndTitle_container">
                        <img :src="hostName + selectedEvent.image.source" alt="" class="eventImage">
                        <div class="eventTitle_container">
                            <h1 class="eventTitle">{{ selectedEvent.title }}</h1>
                        </div>
                    </div>
                    <EventFormUpdate :selectedEvent="selectedEvent"/>
                </AdminFormContainer>
            </div>
        </div>
    </div>
</template>

<style scope lang="scss">

@import '@/assets/sass/dashboard-styles/dashboardPageStyle.scss';
@import '@/assets/sass/dashboard-styles/colors.scss';
@import '@/assets/sass/breakPoints.scss';
@import '@/assets/sass/variables.scss';

.eventImageAndTitle_container {
    align-self: center;
    width: 100%;
    height: 12rem;
    display: inline-block;
    position: relative;
    overflow: hidden;
    border-radius: $containerRadius;

    .eventImage {
        width: 100%;
        height: 100%;
        display: block;
        position: relative;
        object-fit: cover;
    }
    .eventTitle_container {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50%;
        background: linear-gradient(to top, $blackColor, transparent);

        .eventTitle {
            margin: 0;
            font-size: 1.3rem;
            text-align: center;
            color: $whiteColor;
            text-shadow: 1px 1px 5px $blackColor;
            position: absolute;
            bottom: 0;
            left: 0;
            padding: .5rem;
        }
    }
}

@media screen and (min-width: $breakpointTablet) {

    .eventImageAndTitle_container {
        height: 15rem;

        .eventTitle_container {

            .eventTitle {
                font-size: 2rem;
                padding: 1rem;
            }
        }
    }
}

@media screen and (min-width: $breakpointLargeDesktop) {

    .eventImageAndTitle_container {
        height: 18rem;
    }
}

</style>
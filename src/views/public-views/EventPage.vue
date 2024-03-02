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
    <div>
        Je suis eventPage
        <h1 v-if="selectedEvent">{{ selectedEvent.title }}</h1>
    </div>
</template>
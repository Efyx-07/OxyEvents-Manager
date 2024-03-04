<script setup lang="ts">

import type { Event } from '@/types/eventsTypes';
import SectionTitle from '@/eventPage-subComponents/SectionTitle.vue';
import LocationMap from '@/eventPage-subComponents/LocationMap.vue';

// recupère la props de selectedEvent en provenance de EventPage
const props = defineProps<{
    selectedEvent: Event;
}>();

</script>

<template>
    <div class="eventPage-section">
        <SectionTitle title="Informations pratiques"/>
        <p v-html="props.selectedEvent.practicalInformations"></p>
        <LocationMap :location="props.selectedEvent.location"/>
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/eventPage-styles/eventPageSectionsStyle.scss';

</style>
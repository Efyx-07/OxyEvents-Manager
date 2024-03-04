<script setup lang="ts">

import type { Event } from '@/types/eventsTypes';
import ReusableSeparator from '@/sub-components/ReusableSeparator.vue';

// recupère la props de selectedEvent en provenance de EventPage
const props = defineProps<{
    selectedEvent: Event;
}>();

</script>

<template>
    <div class="eventPage-section">
        <div class="title_container">
            <h2>Informations Pratiques</h2>
            <ReusableSeparator class="separator"/>
        </div>
        <div class="text_container">
            <p v-html="props.selectedEvent.practicalInformations"></p>
        </div>
    </div>
</template>
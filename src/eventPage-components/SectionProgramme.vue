<script setup lang="ts">

import type { Event } from '@/types/eventsTypes';
import SectionTitle from '@/eventPage-subComponents/SectionTitle.vue';

// recupère la props de selectedEvent en provenance de EventPage
const props = defineProps<{
    selectedEvent: Event;
}>();

</script>

<template>
    <div class="eventPage-section">
        <SectionTitle title="Programme"/>
        <div class="text_container">
            <p v-html="props.selectedEvent.programme"></p>
        </div>
    </div>
</template>
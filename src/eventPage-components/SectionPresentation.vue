<script setup lang="ts">

import type { Event } from '@/types/eventsTypes';
import SectionTitle from '@/eventPage-subComponents/SectionTitle.vue';

// recupère la props de selectedEvent en provenance de EventPage
const props = defineProps<{
    selectedEvent: Event;
}>();

// gère l'effet d'apparition au défilement avec useIntersectionObserver
import { useIntersectionObserverEffect } from '@/hooks/useIntersectionObserver';
const { target, targetIsVisible } = useIntersectionObserverEffect();

</script>

<template>
    <div class="eventPage-section" ref="target" :class="{ 'visible': targetIsVisible }" :style="{ opacity: targetIsVisible ? 1 : 0, transform: targetIsVisible ? 'translateY(0)' : 'translateY(10%)'}">
        <SectionTitle title="Présentation"/>
        <p v-html="props.selectedEvent.presentation"></p>
    </div>   
</template>

<style lang="scss" scoped>

@import '@/assets/sass/eventPage-styles/eventPageSectionsStyle.scss';

</style>
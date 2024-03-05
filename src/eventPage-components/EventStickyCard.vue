<script setup lang="ts">

import type { Event } from '@/types/eventsTypes';
import ParticipateButton from '@/eventPage-subComponents/ParticipateButton.vue';
import ReusableSeparator from '@/sub-components/ReusableSeparator.vue';

// recupère la props de selectedEvent en provenance de EventPage
const props = defineProps<{
    selectedEvent: Event;
}>();

// reformate la date sous la forme 'ven. 7 juillet 2023'
const formatDate = (date: string): string => {
    // Options pour formater la date
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    // retourne la date formatée
    return new Date(date).toLocaleDateString('fr-FR', options);
};

</script>

<template>
    <div class="eventStickyCard">
        <div class="eventDetails">
            <p>{{ formatDate(props.selectedEvent.date.toString())}}</p>
            <ReusableSeparator class="separator"/>
            <p>{{ props.selectedEvent.location }}</p>
        </div>
        <h3>{{ props.selectedEvent.title }}</h3>
        <ParticipateButton />
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/eventPage-styles/colors.scss';
@import '@/assets/sass/variables.scss';

.eventStickyCard {
    position: sticky;
    top: 6rem;
    width: 100%;
    border-radius: $containerRadiusM;
    border: solid 1px $blackTransparencyLight;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .eventDetails {
        display: flex;
        align-items: center;
        gap: 1rem;

        p {
            margin: 0;
            font-size: .9rem;
            font-weight: 500;
            color: $blackTransparencyStrong;
        }

        .separator {
            width: 1px;
            height: 1.5rem;
        }
    }

    h3 {
        margin: 0;
        font-size: 1.5rem;
    }
}

</style>
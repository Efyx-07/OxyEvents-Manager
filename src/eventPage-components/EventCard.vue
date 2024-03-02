<script setup lang="ts">

import type { Event } from '@/types/eventsTypes';
import { useGlobalDataStore } from '@/stores/GlobalDataStore';
import { Icon } from '@iconify/vue';
import ReusableSeparator from '@/sub-components/ReusableSeparator.vue';
import ParticipateButton from '@/eventPage-subComponents/ParticipateButton.vue';

// recupère la props de selectedEvent en provenance de EventPage
const props = defineProps<{
    selectedEvent: Event;
}>();

const { hostName } = useGlobalDataStore();

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

// fonction pour lier item à la section ancrée
const scrollToSection = (sectionId: string): void => {
    const section = document.getElementById(sectionId);

    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
        });
    }
};

</script>

<template>
    <div class="eventCard">
        <div class="eventImageAndTitle_container">
            <img :src="hostName + props.selectedEvent.image.source" alt="props.selectedEvent.image.alt" class="eventImage">
            <div class="eventTitle_container">
                <h1 class="eventTitle">{{ props.selectedEvent.title }}</h1>
            </div>
        </div>       
        <div class="eventCard-details">
            <div class="eventOrganizer_container">
                <div class="content">
                    <p>Organisé par</p>
                    <a :href="props.selectedEvent.organizerWebsite" target="_blank" rel="noopener noreferrer">{{ props.selectedEvent.organizerName }}</a>
                </div>    
            </div>
            <ReusableSeparator class="separator"/>
            <div class="eventDate_container">
                <Icon icon="healthicons:calendar" class="icon"/>
                <p class="eventDate">{{ formatDate(props.selectedEvent.date.toString())}}</p>
            </div>
            <ReusableSeparator class="separator"/>
            <div class="eventPlace_container">
                <Icon icon="mdi:place-outline" class="icon"/>
                <p class="eventPlace" @click="scrollToSection('practicalInformations')">{{ props.selectedEvent.location }}</p>
            </div>
            <ParticipateButton class="eventCard-button"/>
        </div>      
    </div>
</template>
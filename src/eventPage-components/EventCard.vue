<script setup lang="ts">

import type { Event } from '@/types/eventsTypes';
import { useGlobalDataStore } from '@/stores/GlobalDataStore';
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
        <div class="infos-container">      
            <div class="eventCard-details">
                <a class="eventOrganizer" :href="props.selectedEvent.organizerWebsite" target="_blank" rel="noopener noreferrer">{{ props.selectedEvent.organizerName }}</a>
                <ReusableSeparator class="separator"/>
                <p class="eventDate">{{ formatDate(props.selectedEvent.date.toString())}}</p>
                <ReusableSeparator class="separator"/>
                <p class="eventPlace" @click="scrollToSection('practicalInformations')">{{ props.selectedEvent.location }}</p>
            </div> 
            <h1 class="eventTitle">{{ props.selectedEvent.title }}</h1>
            <ParticipateButton class="participateButton"/> 
        </div>
        <div class="image-container">
            <img :src="hostName + props.selectedEvent.image.source" alt="props.selectedEvent.image.alt">
        </div>      
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/variables.scss';
@import '@/assets/sass/eventPage-styles/colors.scss';
@import '@/assets/sass/breakPoints.scss';

.eventCard {
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    gap: 1rem;

    .infos-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;

        .eventCard-details {
            display: flex;
            gap: .5rem;

            a {
                text-decoration: none;
            }

            a, p {
                margin: 0;
                font-weight: 500;
                color: $blackTransparencyStrong;
            }

            .eventOrganizer, .eventPlace {
                cursor: pointer;

                &:hover {
                    color: $accentColorPrimary;
                }
            }

            .separator {
                width: 1px;
                height: 100%;
            }
        }

        .eventTitle {
            margin: 0;
            font-size: 1.8rem;
        }

        .participateButton {
            display: none;
        }
    }

    .image-container {
        width: 100%;
        height: 100%;
        max-height: 20rem;
        position: relative;
        overflow: hidden;
        border-radius: $containerRadiusM;

        img {
            width: 100%;
            height: 100%;
            position: relative;
            object-fit: cover;
        }
    }
}

@media screen and (min-width: $breakpointDesktop) {

    .eventCard {
        height: 26rem;
        display: grid;
        grid-template-columns: 1fr 1.15fr;
        gap: unset;

        .infos-container {
            gap: 2rem;
            padding: 2rem;

            .eventCard-details {
                flex-direction: unset;
                align-items: center;
                gap: 1rem;
            }

            .eventTitle {
                font-size: 2.3rem;
            }

            .participateButton {
                display: block;
            }
        }

        .image-container {
            max-height: unset;
            grid-column: 2 / -1;
        }
    }
}

</style>
<script setup lang="ts">

import type { Event } from '@/types/eventsTypes';
import ReusableSeparator from '@/sub-components/ReusableSeparator.vue';
import { ref, onMounted } from 'vue';
import { useGlobalDataStore } from '@/stores/GlobalDataStore';

// recupère la props de selectedEvent en provenance de EventPage
const props = defineProps<{
    selectedEvent: Event;
}>();

// rend reactif le lien google maps
const embedUrl = ref<string>('');

// fetch l'URL du lieu via le backend pour mettre à jour la carte
onMounted( async(): Promise<void> => {

    try {
        const { hostName } = useGlobalDataStore();
        if (props.selectedEvent.location) {
            const response: Response = await fetch(`${hostName}/maps?location=${encodeURIComponent(props.selectedEvent.location)}`);
            if (response.ok) {
                  const data: any = await response.json();
                embedUrl.value = data.embedUrl;
            } else {
                console.error('Erreur lors de la récupération de l\'URL sécurisée de la carte.');
            }
        }           
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'URL sécurisée de la carte :', error);
    }
});

</script>

<template>
    <div class="eventPage-section">
        <div class="title_container">
            <h2>Lieu</h2>
            <ReusableSeparator class="separator"/>
        </div>
        <div class="text_container">
            <iframe 
                class="locationMap" 
                width="600"
                height="450"
                style="border:0"
                loading="lazy"
                allowfullscreen
                referrerpolicy="no-referrer-when-downgrade"
                :src="embedUrl">
            </iframe>
        </div>
    </div>  
</template>